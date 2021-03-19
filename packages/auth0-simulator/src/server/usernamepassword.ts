import { Auth0QueryParams } from './types';
import { encode } from 'html-entities';

export type UserNamePasswordForm = {
  auth0Domain?: string;
} & Partial<Auth0QueryParams>;

export const userNamePasswordForm = ({
  auth0Domain = '/login/callback',
  redirect_uri,
  state,
  nonce,
}: UserNamePasswordForm = {}): string => {
  const wctx = encode(
    JSON.stringify({
      strategy: 'auth0',
      auth0Client: 'eyJuYW1lIjoiYXV0aDAuanMtdWxwIiwidmVyc2lvbiI6IjkuMTMuMiJ9',
      tenant: 'resideo',
      connection: 'Username-Password-Authentication',
      client_id: 'x27JIDVbRAVgDCnItaJjJBIwhk8hWtPC',
      response_type: 'code',
      scope: 'openid profile email offline_access',
      redirect_uri,
      state,
      nonce,
      sid: 'nsHvSCIXOcFIFH5B2G7UuADX5PNTxrdO',
      audience: 'https://resideo.auth0.com/api/v2/',
      realm: 'Username-Password-Authentication',
      session_user: '605490b48f132500685c3b9d',
    }),
  );

  return `
  <form method="post" name="hiddenform" action="${auth0Domain}">
    <input type="hidden" name="wa" value="wsignin1.0">
    <input type="hidden" 
           name="wresult" 
           value="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA1MzhjYWQ2YWI5ODQwMDY5OWIxZDZhIiwiZW1haWwiOiJpbXJhbi5zdWxlbWFuamlAcmVzaWRlby5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInNpZCI6Im5zSHZTQ0lYT2NGSUZINUIyRzdVdUFEWDVQTlR4cmRPIiwiaWF0IjoxNjE2MTU0ODA0LCJleHAiOjE2MTYxNTQ4NjQsImF1ZCI6InVybjphdXRoMDpyZXNpZGVvOlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNzIjoidXJuOmF1dGgwIn0.CTl0A1hDc4YrErsrFBCCEG0ekIUU3bv0x12p_vUgoyD6zOg_QhaSZjKeZI2elaeYnAi7KUcohgOP9TApj3VlQtm6GlGNuWIiQke4866FtfhufGo2_uLBWyf4nmOgbNcmhpIg2bvVJHUqM-6OCNfnzPWAoFW2_g-DeIo20WBfK2E">
    <input type="hidden" name="wctx" value="${wctx}">
    <noscript>
        <p>
            Script is disabled. Click Submit to continue.
        </p>
        <input type="submit" value="Submit">
    </noscript>
  </form>`;
};
