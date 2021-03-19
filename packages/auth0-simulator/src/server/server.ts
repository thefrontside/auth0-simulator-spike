import express, { json, urlencoded } from 'express';
import fs from 'fs';
import https, { ServerOptions } from 'https';
import path from 'path';
import cors from 'cors';
import getPort from 'get-port';
import { once, Operation, Task, Deferred } from 'effection';
import { Auth0SimulatorOptions } from './types';
import { AddressInfo } from 'net';
import type { Server as HTTPServer } from 'https';
import { addAuth0Routes } from './auth0_routes';
import { assert } from 'assert-ts';
import { createAuth0Config } from './configCreator';

const cwd = process.cwd();

const ssl: ServerOptions = {
  key: fs.readFileSync(path.join(cwd, 'certs', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(cwd, 'certs', 'localhost.pem')),
};

export interface Server {
  address(): Operation<AddressInfo>;
}

type Runner = {
  run(scope: Task): { address(): Promise<AddressInfo> };
};

const indexHTML = path.resolve('../../node_modules/@resideo/auth0-configuration/deploy/pages/login.html');
assert(fs.existsSync(indexHTML), `no login.html at ${indexHTML}`);

const indexHtmlFile = fs.readFileSync(indexHTML, 'utf-8');

export function createAuth0Simulator({
  port,
  appUrl,
  oauth,
  domain = 'localhost',
  protocol = 'https',
}: Auth0SimulatorOptions): Runner {
  const auth0Domain = `${domain}:${port}`;
  const fullAuth0Domain = `${protocol}://${auth0Domain}`;
  return {
    run(scope: Task) {
      const bound = Deferred<HTTPServer>();
      const app = express();

      app.use(
        cors({
          origin: appUrl,
          credentials: true,
        }),
      );

      scope.spawn(function* () {
        const actualPort: number = yield getPort({ port });

        const httpsServer = https.createServer(ssl, app);

        app.use((_, res, next) => {
          res.set('Pragma', 'no-cache');
          res.set('Cache-Control', 'no-cache, no-store');
          next();
        });

        app.use(json());
        app.use(urlencoded({ extended: true }));

        app.get('/heartbeat', (_, res) => res.status(200).json({ ok: true }));

        addAuth0Routes({ auth0Domain, oauth })(app);

        app.get('/login', (req, res) => {
          const config = createAuth0Config({
            auth0Domain,
            fullAuth0Domain,
            ...req.query,
            client_id: oauth.clientID,
            scope: oauth.scope,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any);

          const raw = Buffer.from(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            JSON.stringify(config),
            'utf8',
          ).toString('base64');

          const configuredHtml = indexHtmlFile.replace(/\@\@config\@\@/g, raw);

          res.set('Content-Type', 'text/html');

          res.status(200).send(Buffer.from(configuredHtml));
        });

        const server = httpsServer.listen(actualPort);

        scope.spawn(function* () {
          const error: Error = yield once(httpsServer, 'error');
          console.dir({ error });
          throw error;
        });

        try {
          yield once(server, 'listening');
          bound.resolve(server);

          yield;
        } finally {
          httpsServer.close();
        }
      });

      return {
        async address() {
          const server = await bound.promise;
          return (server.address() as unknown) as AddressInfo;
        },
      };
    },
  };
}
