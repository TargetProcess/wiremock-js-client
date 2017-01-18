declare interface IRequest{
    method?: string;
    url?: string;
    urlPattern?: string;
}

declare interface IResponse{
    status: number;
    body: any;
    headers?: Object; 
    fault?: string;
}

declare interface IRequestMock{
    request: IRequest;
    response: IResponse;
}