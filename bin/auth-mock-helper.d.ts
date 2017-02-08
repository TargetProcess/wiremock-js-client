export declare class AuthMockHelper {
    private wiremockUrl;
    private authBaseUrl;
    private authUrl;
    private wiremockClient;
    constructor(wiremockUrl: string, authBaseUrl?: string);
    createToken(payload: {
        scope?: string[];
        sub?: string;
    }): any;
    setupMetadataEndpoint(meta: {
        scopesSupported?: string[];
        claimsSupported?: string[];
    }): void;
    setupTokenEndpoint(token: string): void;
    setupJwksEndpoint(): void;
}
