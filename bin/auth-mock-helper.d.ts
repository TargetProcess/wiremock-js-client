export declare class AuthMockHelper {
    private wiremockUrl;
    private authBaseUrl;
    private authUrl;
    private wiremockClient;
    constructor(wiremockUrl: string, authBaseUrl?: string);
    createToken(scopes: string[]): any;
    setupMetadataEndpoint(scopesSupported?: string[], claimsSupported?: string[]): void;
    setupTokenEndpoint(token: string): void;
    setupJwksEndpoint(): void;
}
