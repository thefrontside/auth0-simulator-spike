# example website

Example Static website to call auth0 simulator

You will need a file in a file at `./src/auth0_config.ts`, that contains auth0 configuration that resembles this:

```ts
import { Auth0ProviderOptions } from '@auth0/auth0-react';

export const Auth: Auth0ProviderOptions = {
  domain: 'localhost:4000',
  clientId: 'IsuLUyWaFczCbAKQrIpVPmyBTFs4g5iq',
  clientSecret: 'WKkaiheEDD3-EL6RJVVm23AgmAbK_CyRNfvkdJuconSQcZzxwb_ur8514rWyBcDQ',
};
```

The important bits are

- domain is the address the simulation control server is running on
- simulationId: the `uuid` of a running simulation

## Quick start

```bash
yarn start
```
