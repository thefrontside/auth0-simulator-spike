# auth0-simulator

This package provides an https server that mimics the responses of a real auth0 server.

## CONFIG

Configuration is read from a [.env file](https://github.com/motdotla/dotenv).

An example configuration is below:

```
PORT=4400
AUTH0_AUDIENCE=https://resideo.com
AUTH0_CLIENT_ID=x27JIDVbRAVgDCnItaJjJBIwhk8hWtPC
AUTH0_SCOPE=openid profile email offline_access
GATEWAY_URL=https://localhost:4000/graphql
GRAPHQL_SCHEMA_PACKAGE=zeus-gateway-staged
```

## SSL

The auth0 simulator needed to run over https.  [mkcert](https://github.com/FiloSottile/mkcert) makes this pretty easy:

```bash
brew install mkcert
brew install nss  # for firefox

cd ./packages/auth0-simulator/certs
mkcert -install   # Created a new local CA at the location returned from `mkcert -CAROOT`
mkcert localhost  # Using the local CA at CAROOT, create a new certificate valid for the following names
```

### re-install

If for whatever reason, you need to regenerate your certs then

```bash
cd ./certs
mkcert -uninstall localhost
# it might be necessary to uninstall the root certs
# mkcert -uninstall 
# rm -rf "$(mkcert -CAROOT)/*"
# mkcert -install
mkcert localhost
```

## quick start
```bash
yarn install
yarn start
```