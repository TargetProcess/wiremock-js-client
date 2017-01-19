export declare class AuthMockHelper {
    private wiremockUrl;
    private authBaseUrl;
    private authUrl;
    private wiremockClient;
    constructor(wiremockUrl: string, authBaseUrl?: string);
    createToken(scopes: string[]): any;
    setupMetadataEndpoint(): void;
    setupTokenEndpoint(token: string): void;
    setupJwksEndpoint(): void;
}
