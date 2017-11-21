import { ITokenPayload } from './models';
export declare class AuthMockHelper {
    private wiremockUrl;
    private authBaseUrl;
    private authUrl;
    private wiremockClient;
    constructor(wiremockUrl: string, authBaseUrl?: string);
    createToken(payload: ITokenPayload): any;
    setupMetadataEndpoint(meta: {
        scopesSupported?: string[];
        claimsSupported?: string[];
    }): void;
    setupTokenEndpoint(token: string): void;
    setupJwksEndpoint(): void;
}
