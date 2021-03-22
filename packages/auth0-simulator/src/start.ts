import { createAuth0Simulator } from './server/server';
import { main } from '@effection/node';
import { AddressInfo } from 'net';
import { config } from 'dotenv';

config();

const serverPort = Number(process.env.PORT);

main(function* (scope) {
  const server = createAuth0Simulator({
    port: serverPort,
    appUrl: 'http://localhost:3000',
    oauth: {
      clientID: process.env.AUTH0_CLIENT_ID as string,
      scope: process.env.AUTH0_AUDIENCE as string,
      audience: process.env.AUTH0_AUDIENCE as string
    },
  }).run(scope);

  const { port }: AddressInfo = yield server.address();

  console.log(`auth0 simulation server running on https://localhost:${port}/`);

  yield;
});
