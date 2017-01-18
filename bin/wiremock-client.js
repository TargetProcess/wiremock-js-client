"use strict";
const sync_request_1 = require("sync-request");
class WiremockClient {
    constructor(wiremockUrl) {
        this.wiremockUrl = wiremockUrl;
        this.allMocksUri = '';
        this.newMockUri = '';
        this.createRawMock = function (method, url, responseBody) {
            this.createMock(method, url, 200, responseBody, false);
        };
        this.createRawMockPattern = function (method, urlPattern, responseBody) {
            this.createMock(method, urlPattern, 200, responseBody, true);
        };
        this.newMockUri = `${this.wiremockUrl}/__admin/mappings/new`;
        this.allMocksUri = `${this.wiremockUrl}/__admin/mappings`;
    }
    mockRequest(mock) {
        let options = {
            json: mock
        };
        var response = sync_request_1.default('POST', this.newMockUri, options);
        response.getBody();
    }
    createMock(method, url, statusCode, body, isPattern, headers, fault) {
        let mock = {
            request: {
                method: method,
            },
            response: {
                status: statusCode,
                body: body,
                headers: headers,
                fault: fault
            }
        };
        if (isPattern) {
            mock.request.urlPattern = url;
        }
        else {
            mock.request.url = url;
        }
        this.mockRequest(mock);
    }
    createEmptyResponseMock(method, url) {
        this.createMock(method, url, 200, null, false, null, 'EMPTY_RESPONSE');
    }
    createEmptyResponseMockPattern(method, url) {
        this.createMock(method, url, 200, null, true, null, 'EMPTY_RESPONSE');
    }
    createJsonMock(method, url, responseBody) {
        this.createMock(method, url, 200, responseBody, false, { 'Content-Type': 'application/json' });
    }
    createJsonMockPattern(method, urlPattern, responseBody) {
        this.createMock(method, urlPattern, 200, responseBody, true, { 'Content-Type': 'application/json' });
    }
    createStatusCodeMock(method, url, statusCode) {
        this.createMock(method, url, statusCode, "", false);
    }
    createStatusCodeMockPattern(method, url, statusCode) {
        this.createMock(method, url, statusCode, "", true);
    }
    clearMocks() {
        sync_request_1.default('DELETE', this.allMocksUri);
    }
}
exports.WiremockClient = WiremockClient;
//# sourceMappingURL=wiremock-client.js.map