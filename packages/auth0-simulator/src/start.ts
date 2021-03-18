import { createAuth0Simulator } from './server/server';
import { main } from '@effection/node';
import { AddressInfo } from 'net';

const serverPort = Number(process.env.PORT);

main(function* (scope) {
  const server = createAuth0Simulator({
    port: serverPort,
    appUrl: 'http://localhost:5000',
  }).run(scope);

  const { port }: AddressInfo = yield server.address();

  console.log(`Simulation server running on https://localhost:${port}/`);

  yield;
});
