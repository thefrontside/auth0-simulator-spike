import type { SimulationsState } from '../types';
import express, { json } from 'express';
import { addRoutes } from '../simulators/auth0/auth0-routes';
import { main } from '@effection/node';
import fs from 'fs';
import https, { ServerOptions } from 'https';
import path from 'path';
import cors from 'cors';

const cwd = process.cwd();

const ssl: ServerOptions = {
  key: fs.readFileSync(path.join(cwd, 'certs', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(cwd, 'certs', 'localhost.pem')),
};

// import helmet from 'helmet';

const port = process.env.PORT || 3000;


main(function* () {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5000',
      credentials: true,
    }),
  );

  const server = https.createServer(ssl, app);

  // app.use(helmet());

  app.use((_, res, next) => {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store');
    next();
  });

  app.use(json());

  addRoutes(atom)(app);

  server.listen({ port }, () => {
    console.log(`🚀 Server ready at https://localhost:${port}/graphql`);
  });
});
