export interface UserNamePasswordForm {
  auth0Domain?: string;
}

export const userNamePasswordForm = ({ auth0Domain = '/login/callback' }: UserNamePasswordForm = {}) => `
    <form method="post" name="hiddenform" action="${auth0Domain}">
    <input type="hidden" name="wa" value="wsignin1.0">
    <input type="hidden" 
           name="wresult" 
           value="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjA1MzhjYWQ2YWI5ODQwMDY5OWIxZDZhIiwiZW1haWwiOiJpbXJhbi5zdWxlbWFuamlAcmVzaWRlby5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInNpZCI6Im5zSHZTQ0lYT2NGSUZINUIyRzdVdUFEWDVQTlR4cmRPIiwiaWF0IjoxNjE2MTU0ODA0LCJleHAiOjE2MTYxNTQ4NjQsImF1ZCI6InVybjphdXRoMDpyZXNpZGVvOlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNzIjoidXJuOmF1dGgwIn0.CTl0A1hDc4YrErsrFBCCEG0ekIUU3bv0x12p_vUgoyD6zOg_QhaSZjKeZI2elaeYnAi7KUcohgOP9TApj3VlQtm6GlGNuWIiQke4866FtfhufGo2_uLBWyf4nmOgbNcmhpIg2bvVJHUqM-6OCNfnzPWAoFW2_g-DeIo20WBfK2E">
    <input type="hidden" name="wctx" value="{&#34;strategy&#34;:&#34;auth0&#34;,&#34;auth0Client&#34;:&#34;eyJuYW1lIjoiYXV0aDAuanMtdWxwIiwidmVyc2lvbiI6IjkuMTMuMiJ9&#34;,&#34;tenant&#34;:&#34;resideo&#34;,&#34;connection&#34;:&#34;Username-Password-Authentication&#34;,&#34;client_id&#34;:&#34;x27JIDVbRAVgDCnItaJjJBIwhk8hWtPC&#34;,&#34;response_type&#34;:&#34;code&#34;,&#34;scope&#34;:&#34;openid profile email offline_access&#34;,&#34;redirect_uri&#34;:&#34;https://qa--resideo-pro.netlify.app&#34;,&#34;state&#34;:&#34;g6Fo2SBEWnZ2TW9TQjJLSVZqcjZxV0llVVA1Y1hZNlg5b05lc6N0aWTZIHBXa205eHhtNzhUMWJNamxwckF2M0t0LTRzUVR5UkZWo2NpZNkgeDI3SklEVmJSQVZnRENuSXRhSmpKQkl3aGs4aFd0UEM&#34;,&#34;nonce&#34;:&#34;SHVXLXZkUE9JOE9KLnRpVnhNbTNhMnVhSF9HN1hoNmpiSHpFeDdIRXZMbQ==&#34;,&#34;sid&#34;:&#34;nsHvSCIXOcFIFH5B2G7UuADX5PNTxrdO&#34;,&#34;audience&#34;:&#34;https://resideo.auth0.com/api/v2/&#34;,&#34;realm&#34;:&#34;Username-Password-Authentication&#34;,&#34;session_user&#34;:&#34;605490b48f132500685c3b9d&#34;}">
    <noscript>
        <p>
            Script is disabled. Click Submit to continue.
        </p><input type="submit" value="Submit">
    </noscript>
</form>` 