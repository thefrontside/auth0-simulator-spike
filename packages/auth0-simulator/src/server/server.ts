import express, { json } from 'express';
import fs from 'fs';
import https, { ServerOptions } from 'https';
import path from 'path';
import cors from 'cors';
import getPort from 'get-port';
import { once, Operation, Task, Deferred } from 'effection';
import { Auth0SimulatorOptions } from './types';
import { AddressInfo } from 'net';
import type { Server as HTTPServer } from 'https';
import { addAuth0Routes } from './routes';
import { assert } from 'assert-ts';

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

const publicDir = path.join(cwd, 'build');
assert(fs.existsSync(publicDir), `no static build at ${publicDir}`);

const indexHTML = path.join(publicDir, 'index.html');
assert(fs.existsSync(indexHTML), `no index.html at ${indexHTML}`);

export function createAuth0Simulator({ port, appUrl, oauth }: Auth0SimulatorOptions): Runner {
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

        app.get('/heartbeat', (_, res) => res.status(200).json({ ok: true }));

        addAuth0Routes({ port, appUrl, oauth })(app);

        app.use(express.static(publicDir));

        app.get('/login', (_, res) => {
          res.sendFile(indexHTML);
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
