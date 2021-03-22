import { ensureTrailingSlash } from '../utils/url';
import { Auth0Config } from './types';

export const createAuth0Config = ({
  auth0Domain,
  fullAuth0Domain,
  redirect_uri,
  state,
  client_id,
  scope,
}:Auth0Config) => {
  return {
    icon: 'https://www.resideo.com/Areas/Resideo/img/resideo-block-logo-white.svg',
    assetsUrl: '',
    auth0Domain,
    auth0Tenant: 'resideo',
    clientConfigurationBaseUrl: 'https://cdn.auth0.com/',
    callbackOnLocationHash: false,
    callbackURL: redirect_uri,
    cdn: 'https://cdn.auth0.com/',
    clientID: client_id,
    dict: {
      signin: {
        title: 'Resideo Pro',
      },
    },
    extraParams: {
      protocol: 'oauth2',
      audience: 'https://resideo.auth0.com/api/v2/',
      scope,
      response_type: 'code',
      response_mode: 'query',
      state,
    },
    internalOptions: {
      protocol: 'oauth2',
      audience: 'https://resideo.auth0.com/api/v2/',
      scope,
      response_type: 'code',
      response_mode: 'query',
      state,
    },
    widgetUrl: 'https://cdn.auth0.com/w2/auth0-widget-5.1.min.js',
    isThirdPartyClient: false,
    authorizationServer: {
      url: fullAuth0Domain,
      issuer: ensureTrailingSlash(fullAuth0Domain),
    },
    colors: {
      page_background: '#ededed',
      primary: '#032a3b',
    },
  };
};
