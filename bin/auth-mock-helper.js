"use strict";
const fs_1 = require("fs");
const path_1 = require("path");
const rsa_pem_to_jwk_1 = require("rsa-pem-to-jwk");
const jsonwebtoken_1 = require("jsonwebtoken");
const url_join_1 = require("url-join");
const wiremock_client_1 = require("./wiremock-client");
const jwksUri = '/.well-known/openid-configuration/jwks';
const metadataEndpoint = '/.well-known/openid-configuration';
const tokenEndpoint = '/connect/token';
const pem = fs_1.default.readFileSync(path_1.default.resolve(__dirname) + '/../data/private.pem');
const jwk = rsa_pem_to_jwk_1.default(pem, { use: 'sig' }, 'public');
class AuthMockHelper {
    constructor(wiremockUrl, authBaseUrl) {
        this.wiremockUrl = wiremockUrl;
        this.authBaseUrl = authBaseUrl;
        this.authUrl = '';
        if (!this.authBaseUrl) {
            this.authBaseUrl = '';
        }
        this.authUrl = url_join_1.default(this.wiremockUrl, this.authBaseUrl);
        this.wiremockClient = new wiremock_client_1.WiremockClient(this.wiremockUrl);
    }
    createToken(scopes) {
        return jsonwebtoken_1.default.sign({ scope: scopes }, pem, { algorithm: 'RS256', expiresIn: '1h', header: { kid: 'f3ac035dfb99d1c6f12015c014555242317159df' } });
    }
    setupJwksEndpoint() {
        let metadata = `{"issuer":"${this.authUrl}","jwks_uri":"${this.authUrl}/.well-known/openid-configuration/jwks","authorization_endpoint":"${this.authUrl}/connect/authorize","token_endpoint":"${this.authUrl}/connect/token","userinfo_endpoint":"${this.authUrl}/connect/userinfo","end_session_endpoint":"${this.authUrl}/connect/endsession","check_session_iframe":"${this.authUrl}/connect/checksession","revocation_endpoint":"${this.authUrl}/connect/revocation","introspection_endpoint":"${this.authUrl}/connect/introspect","frontchannel_logout_supported":true,"frontchannel_logout_session_supported":true,"scopes_supported":["openid","email","tp","instances:manage","workspaces:write","workspaces:read","files:write"],"claims_supported":["sub","email","email_verified"],"response_types_supported":["code","token","id_token","id_token token","code id_token","code token","code id_token token"],"response_modes_supported":["form_post","query","fragment"],"grant_types_supported":["authorization_code","client_credentials","refresh_token","implicit"],"subject_types_supported":["public"],"id_token_signing_alg_values_supported":["RS256"],"token_endpoint_auth_methods_supported":["client_secret_basic","client_secret_post"],"code_challenge_methods_supported":["plain","S256"]}`;
        this.wiremockClient.createJsonMock('GET', metadataEndpoint, JSON.parse(metadata));
    }
    setupTokenEndpoint(token) {
        let token_response = { "access_token": token, "expires_in": 3600, "token_type": "Bearer" };
        this.wiremockClient.createJsonMock('POST', tokenEndpoint, token_response);
    }
    setupJwksEndpointMock() {
        let jwksResponse = {
            keys: [{
                    kty: 'RSA',
                    alg: 'RS256',
                    use: 'sig',
                    kid: 'f3ac035dfb99d1c6f12015c014555242317159df',
                    n: jwk.n,
                    e: jwk.e
                }]
        };
        this.wiremockClient.createJsonMock('GET', jwksUri, jwksResponse);
    }
}
exports.AuthMockHelper = AuthMockHelper;
//# sourceMappingURL=auth-mock-helper.js.map