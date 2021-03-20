import { createAuth0Simulator } from './server/server';
import { main } from '@effection/node';
import { AddressInfo } from 'net';

const serverPort = Number(process.env.PORT);

main(function* (scope) {
  const server = createAuth0Simulator({
    port: serverPort,
    appUrl: 'http://localhost:3000',
    oauth: {
      clientID: 'x27JIDVbRAVgDCnItaJjJBIwhk8hWtPC',
      scope: 'openid profile email offline_access',
    },
  }).run(scope);

  const { port }: AddressInfo = yield server.address();

  console.log(`auth0 simulation server running on https://localhost:${port}/`);

  yield;
});
