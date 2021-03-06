"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("sync-request");
class WiremockClient {
    constructor(wiremockUrl) {
        this.wiremockUrl = wiremockUrl;
        this.allMocksUri = '';
        this.newMockUri = '';
        this.createRawMock = (method, url, responseBody) => {
            this.createMock(method, url, 200, responseBody, false);
        };
        this.createRawMockPattern = (method, urlPattern, responseBody) => {
            this.createMock(method, urlPattern, 200, responseBody, true);
        };
        this.newMockUri = `${this.wiremockUrl}/__admin/mappings/new`;
        this.allMocksUri = `${this.wiremockUrl}/__admin/mappings`;
    }
    mockRequest(mock) {
        const options = {
            json: mock
        };
        const response = request('POST', this.newMockUri, options);
        response.getBody();
    }
    createRequest(method, url, statusCode, body, isPattern, headers, fault) {
        const mock = {
            request: {
                method
            },
            response: {
                status: statusCode,
                body,
                headers,
                fault
            }
        };
        if (isPattern) {
            mock.request.urlPattern = url;
        }
        else {
            mock.request.urlPath = url;
        }
        return mock;
    }
    createMock(method, url, statusCode, body, isPattern, headers, fault) {
        const mock = this.createRequest(method, url, statusCode, body, isPattern, headers, fault);
        this.mockRequest(mock);
    }
    createEmptyResponseMock(method, url) {
        this.createMock(method, url, 200, null, false, null, 'EMPTY_RESPONSE');
    }
    createEmptyResponseMockPattern(method, url) {
        this.createMock(method, url, 200, null, true, null, 'EMPTY_RESPONSE');
    }
    createJsonMock(method, url, responseBody) {
        const mock = this.createRequest(method, url, 200, '', false, { 'Content-Type': 'application/json' });
        delete mock.response.body;
        mock.response.jsonBody = responseBody;
        this.mockRequest(mock);
    }
    createJsonMockPattern(method, urlPattern, responseBody) {
        const mock = this.createRequest(method, urlPattern, 200, '', true, { 'Content-Type': 'application/json' });
        delete mock.response.body;
        mock.response.jsonBody = responseBody;
        this.mockRequest(mock);
    }
    createStatusCodeMock(method, url, statusCode) {
        this.createMock(method, url, statusCode, '', false);
    }
    createStatusCodeMockPattern(method, url, statusCode) {
        this.createMock(method, url, statusCode, '', true);
    }
    clearMocks() {
        request('DELETE', this.allMocksUri);
    }
}
exports.WiremockClient = WiremockClient;
//# sourceMappingURL=wiremock-client.js.map