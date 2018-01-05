import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'
import * as path from 'path'
import * as rsaPemToJwk from 'rsa-pem-to-jwk'
import * as urlJoin from 'url-join'
import { ITokenPayload } from './models'
import { WiremockClient } from './wiremock-client'

const jwksUri = '/.well-known/openid-configuration/jwks'
const metadataEndpoint = '/.well-known/openid-configuration'
const tokenEndpoint = '/connect/token'

const pem = fs.readFileSync(path.resolve(__dirname) + '/../data/private.pem')
const jwk = rsaPemToJwk(pem, { use: 'sig' }, 'public')

export class AuthMockHelper {
  private authUrl: string = ''
  private wiremockClient: WiremockClient

  constructor(private wiremockUrl: string, private authBaseUrl?: string) {
    if (!this.authBaseUrl) {
      this.authBaseUrl = ''
    }
    this.authUrl = this.authBaseUrl ? urlJoin(this.wiremockUrl, this.authBaseUrl) : this.wiremockUrl
    this.wiremockClient = new WiremockClient(this.wiremockUrl)
  }

  public createToken(payload: ITokenPayload | any) {
    return jwt.sign(payload, pem,
      {
        algorithm: 'RS256',
        expiresIn: '1h',
        header: { kid: '442802BE2AB597A24123226E7BC66DCD53A11D98' }
      })
  }

  // tslint:disable-next-line:max-line-length
  public setupMetadataEndpoint(meta: { scopesSupported?: string[], claimsSupported?: string[] }) {
    const metadata = {
      issuer: this.authUrl,
      jwks_uri: `${this.authUrl}/.well-known/openid-configuration/jwks`,
      authorization_endpoint: `${this.authUrl}/connect/authorize`,
      token_endpoint: `${this.authUrl}/connect/token`,
      userinfo_endpoint: `${this.authUrl}/connect/userinfo`,
      end_session_endpoint: `${this.authUrl}/connect/endsession`,
      check_session_iframe: `${this.authUrl}/connect/checksession`,
      revocation_endpoint: `${this.authUrl}/connect/revocation`,
      introspection_endpoint: `${this.authUrl}/connect/introspect`,
      frontchannel_logout_supported: true,
      frontchannel_logout_session_supported: true,
      scopes_supported: meta.scopesSupported ? meta.scopesSupported : ['openid', 'email'],
      claims_supported: meta.claimsSupported ? meta.claimsSupported : ['sub', 'email', 'email_verified'],
      // tslint:disable-next-line:max-line-length
      response_types_supported: ['code', 'token', 'id_token', 'id_token token', 'code id_token', 'code token', 'code id_token token'],
      response_modes_supported: ['form_post', 'query', 'fragment'],
      grant_types_supported: ['authorization_code', 'client_credentials', 'refresh_token', 'implicit'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      token_endpoint_auth_methods_supported: ['client_secret_basic', 'client_secret_post'],
      code_challenge_methods_supported: ['plain', 'S256']
    }
    this.wiremockClient.createJsonMock('GET', metadataEndpoint, metadata)
  }

  public setupTokenEndpoint(token: string) {
    const tokenResponse = { access_token: token, expires_in: 3600, token_type: 'Bearer' }

    this.wiremockClient.createJsonMock('POST', tokenEndpoint, tokenResponse)
  }

  public setupJwksEndpoint() {
    const jwksResponse = {
      keys: [{
        kty: 'RSA',
        alg: 'RS256',
        use: 'sig',
        kid: '442802BE2AB597A24123226E7BC66DCD53A11D98',
        n: jwk.n,
        e: jwk.e
      }]
    }

    this.wiremockClient.createJsonMock('GET', jwksUri, jwksResponse)
  }
}
