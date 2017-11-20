export interface IRequest {
    method?: string;
    urlPath?: string;
    urlPattern?: string;
}
export interface IResponse {
    status: number;
    body?: any;
    headers?: Object;
    fault?: string;
    jsonBody?: Object;
}
export interface IRequestMock {
    request: IRequest;
    response: IResponse;
}
