export type Auth0QueryParams = {
  state: string;
  code: string;
  redirect_uri: string;
  code_challenge: string;
  scope: string;
  client_id: string;
  nonce: string;
  simulationId: string;
  code_challenge_method: string;
  response_type: string;
  response_mode: 'query' | 'web_message' | 'fragment';
  auth0Client: string;
};

export type OauthTokenBody = {
  client_id: string;
  code_verifier: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
};

export interface Auth0SimulatorOptions {
  port: number;
  protocol?: string;
  domain?: string;
  appUrl: string;
  oauth: {
    clientID: string;
    scope: string;
  };
}

export type Auth0Config = {
  auth0Domain: string;
  fullAuth0Domain: string;
  audience: string;
} & Auth0QueryParams;
