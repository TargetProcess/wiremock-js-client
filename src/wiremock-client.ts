import * as request from 'sync-request'

export class WiremockClient {
    private allMocksUri: string = ''
    private newMockUri: string = ''

    constructor(private wiremockUrl: string) {
        this.newMockUri = `${this.wiremockUrl}/__admin/mappings/new`
        this.allMocksUri = `${this.wiremockUrl}/__admin/mappings`
    }

    public mockRequest(mock: IRequestMock) {
        console.log(mock)
        let options = {
            json: mock
        }
        var response = request('POST', this.newMockUri, options)
        response.getBody()
    }

    private createMock(method: string, url: string, statusCode: number, body: any, isPattern: boolean, headers?, fault?: string) {
        let mock: IRequestMock = {
            request: {
                method: method,
            },
            response: {
                status: statusCode,
                body: body,
                headers: headers,
                fault: fault
            }
        }

        if (isPattern) {
            mock.request.urlPattern = url
        } else {
            mock.request.url = url
        }

        this.mockRequest(mock)
    }

    public createEmptyResponseMock(method: string, url: string) {
        this.createMock(method, url, 200, null, false, null, 'EMPTY_RESPONSE')
    }

    public createEmptyResponseMockPattern(method: string, url: string) {
        this.createMock(method, url, 200, null, true, null, 'EMPTY_RESPONSE')
    }

    public createJsonMock(method: string, url: string, responseBody) {
        this.createMock(method, url, 200, responseBody, false, { 'Content-Type': 'application/json' })
    }

    public createJsonMockPattern(method: string, urlPattern: string, responseBody) {
        this.createMock(method, urlPattern, 200, responseBody, true, { 'Content-Type': 'application/json' })
    }

    public createStatusCodeMock(method: string, url: string, statusCode: number) {
        this.createMock(method, url, statusCode, "", false)
    }

    public createStatusCodeMockPattern(method: string, url: string, statusCode: number) {
        this.createMock(method, url, statusCode, "", true)
    }

    public createRawMock = function (method: string, url: string, responseBody) {
        this.createMock(method, url, 200, responseBody, false)
    }

    public createRawMockPattern = function (method: string, urlPattern: string, responseBody) {
        this.createMock(method, urlPattern, 200, responseBody, true)
    }

    public clearMocks() {
        request('DELETE', this.allMocksUri)
    }
}