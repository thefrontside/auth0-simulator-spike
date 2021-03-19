import type { Express } from 'express';
import { Request, Response } from 'express';
import { webMessage } from './webMessage';
import { Auth0QueryParams, Auth0SimulatorOptions } from './types';
import createJWKSMock from '../jwt/create-jwt-mocks';
import { expiresAt } from '../utils/date';
import { redirect } from './redirect';
import { userNamePasswordForm } from './usernamepassword';

// HACK: horrible spike code temp store.
const nonceMap: Record<
  string,
  {
    code_challenge: string;
    redirect_uri: string;
    nonce: string;
  }
> = {};

export const addAuth0Routes = ({
  auth0Domain,
  oauth,
}: Pick<Auth0SimulatorOptions, 'oauth'> & { auth0Domain: string }) => (app: Express): void => {
  const jwksMock = createJWKSMock(auth0Domain);

  app.get('/authorize', (req, res) => {
    const {
      client_id,
      redirect_uri,
      scope,
      state,
      code_challenge,
      nonce,
      response_mode,
    } = req.query as Auth0QueryParams;

    console.dir({ q: req.query });

    const required = { client_id, scope, redirect_uri } as const;

    for (const key of Object.keys(required)) {
      if (!required[key as keyof typeof required]) {
        return res.status(400).send(`missing ${key}`);
      }
    }

    res.removeHeader('X-Frame-Options');

    res.set('Content-Type', 'text/html');

    const raw =
      response_mode === 'web_message'
        ? webMessage({ code: code_challenge, state, redirect_uri, nonce })
        : redirect({ state });

    nonceMap[code_challenge] = {
      code_challenge,
      redirect_uri,
      nonce,
    };

    if (response_mode === 'web_message') {
      return res.status(200).send(Buffer.from(raw));
    }

    return res.status(302).redirect(`/login?state=${state}&redirect_uri=${redirect_uri}`);
  });

  app.get('/u/login', (_, res) => {
    res.status(200).redirect(`/login`);
  });

  app.post('/usernamepassword/login', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html');

    return res.status(200).send(userNamePasswordForm(req.body));
  });

  app.post('/login/callback', (req, res) => {
    const wctx = JSON.parse(req.body.wctx);

    console.dir({ wctx });
    const { redirect_uri, state, nonce } = wctx;

    const appUrl = `${redirect_uri}?code=${state}&state=${state}?nonce=${nonce}`;

    return res.status(302).redirect(appUrl);
  });

  app.post('/oauth/token', function (req, res) {
    console.dir({ nonceMap, b: req.body });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { client_id, code_verifier, code, grant_type, redirect_uri } = req.body;
    const alg = 'RS256';

    const issued = Date.now();

    const { nonce } = nonceMap[code];

    if (!nonce) {
      return res.status(400).send(`no nonce in store for ${code}`);
    }

    const expires = expiresAt();

    const idToken = jwksMock.token({
      alg,
      typ: 'JWT',
      iss: auth0Domain,
      exp: expires,
      iat: issued,
      mail: 'bob@gmail.com',
      aud: client_id,
      sub: 'subject field',
      nonce,
    });

    const accessToken = jwksMock.token({
      alg,
      typ: 'JWT',
      iss: auth0Domain,
      exp: expires,
      iat: issued,
      aud: client_id,
    });

    return res.status(200).json({
      access_token: accessToken,
      id_token: idToken,
      scope: oauth.scope,
      expires_in: 86400,
      token_type: 'Bearer',
    });
  });
};
