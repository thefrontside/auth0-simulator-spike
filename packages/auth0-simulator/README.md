# auth0-simulator

Spike unknowns surrounding an auth0 simulator

## SSL

The auth0 simulator needed to run over https.  [mkcert](https://github.com/FiloSottile/mkcert) makes this pretty easy:

```bash
brew install mkcert
brew install nss  # for firefox

cd ./certs
mkcert -install   # Created a new local CA at the location returned from `mkcert -CAROOT`
mkcert localhost  # Using the local CA at CAROOT, create a new certificate valid for the following names
```

### re-install

If for whatever reason, you need to regenerate your certs then

```bash
cd ./certs
mkcerts -uninstall localhost
# it might be necessary to uninstall the root certs
# mkcerts -uninstall 
# rm -r "$(mkcert -CAROOT)/rootCA*.*"
# mkcerts -install
mkcerts localhost
```

## quick start
```bash
yarn watch
```