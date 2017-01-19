export declare class WiremockClient {
    private wiremockUrl;
    private allMocksUri;
    private newMockUri;
    constructor(wiremockUrl: string);
    mockRequest(mock: IRequestMock): void;
    private createRequest(method, url, statusCode, body, isPattern, headers?, fault?);
    private createMock(method, url, statusCode, body, isPattern, headers?, fault?);
    createEmptyResponseMock(method: string, url: string): void;
    createEmptyResponseMockPattern(method: string, url: string): void;
    createJsonMock(method: string, url: string, responseBody: any): void;
    createJsonMockPattern(method: string, urlPattern: string, responseBody: any): void;
    createStatusCodeMock(method: string, url: string, statusCode: number): void;
    createStatusCodeMockPattern(method: string, url: string, statusCode: number): void;
    createRawMock: (method: string, url: string, responseBody: any) => void;
    createRawMockPattern: (method: string, urlPattern: string, responseBody: any) => void;
    clearMocks(): void;
}
