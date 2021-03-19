export interface Auth0Config {
    auth0Domain: string;
    client_id: string;
    redirect_uri: string;
    audience: string;
    scope: string;
    response_type: string;
    response_mode: string;
    authorization: {
        url: string;
        issuer: string;
    }
}

export const createAuth0Config = (config?: any): any =>{return {
  "icon": "https://www.resideo.com/Areas/Resideo/img/resideo-block-logo-white.svg",
  "assetsUrl": "",
  "auth0Domain": "localhost:4400",
  "auth0Tenant": "resideo",
  "clientConfigurationBaseUrl": "https://cdn.auth0.com/",
  "callbackOnLocationHash": false,
  "callbackURL": "http://localhost:5000",
  "cdn": "https://cdn.auth0.com/",
  "clientID": "x27JIDVbRAVgDCnItaJjJBIwhk8hWtPC",
  "dict": {
      "signin": {
          "title": "Resideo Pro"
      }
  },
  "extraParams": {
      "protocol": "oauth2",
      "audience": "https://resideo.auth0.com/api/v2/",
      "scope": "openid profile email offline_access",
      "response_type": "code",
      "response_mode": "query",
      "nonce": "QkpmYXFGcVlyVzVkVzlpNURCdGRXc0VKWTZNMDZQdDVmczQ3U2FZbH5ffg==",
      "code_challenge": "JUVqxL2lwOiBMAPJtrHFhtrNZklzkjno8TPdlzvjerg",
      "code_challenge_method": "S256",
      "auth0Client": "eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4wLjAifQ==",
      "_csrf": "Vm0Pg0wv-79rIcQLJ7-DEP3RrNJ3SKAB7C9U",
      "_intstate": "deprecated",
      "state": "g6Fo2SBrbHlXSUtkS0RQcW5EbEdqTzJQZlJzTUJIVndHeGRMd6N0aWTZIGZaUDdTZFp4ejNZekJFR1RJYVJGNHo5Yzh4aUdnMVlIo2NpZNkgeDI3SklEVmJSQVZnRENuSXRhSmpKQkl3aGs4aFd0UEM"
  },
  "internalOptions": {
      "protocol": "oauth2",
      "audience": "https://resideo.auth0.com/api/v2/",
      "scope": "openid profile email offline_access",
      "response_type": "code",
      "response_mode": "query",
      "nonce": "QkpmYXFGcVlyVzVkVzlpNURCdGRXc0VKWTZNMDZQdDVmczQ3U2FZbH5ffg==",
      "code_challenge": "JUVqxL2lwOiBMAPJtrHFhtrNZklzkjno8TPdlzvjerg",
      "code_challenge_method": "S256",
      "auth0Client": "eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4wLjAifQ==",
      "_csrf": "Vm0Pg0wv-79rIcQLJ7-DEP3RrNJ3SKAB7C9U",
      "_intstate": "deprecated",
      "state": "g6Fo2SBrbHlXSUtkS0RQcW5EbEdqTzJQZlJzTUJIVndHeGRMd6N0aWTZIGZaUDdTZFp4ejNZekJFR1RJYVJGNHo5Yzh4aUdnMVlIo2NpZNkgeDI3SklEVmJSQVZnRENuSXRhSmpKQkl3aGs4aFd0UEM"
  },
  "widgetUrl": "https://cdn.auth0.com/w2/auth0-widget-5.1.min.js",
  "isThirdPartyClient": false,
  "authorizationServer": {
      "url": "http://localhost:5000",
      "issuer": "http://localhost:5000/"
  },
  "colors": {
      "page_background": "#ededed",
      "primary": "#032a3b"
  }
}}