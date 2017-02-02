declare interface IRequest {
  method?: string
  urlPath?: string
  urlPattern?: string
}

declare interface IResponse {
  status: number
  body?: any
  headers?: Object
  fault?: string
  jsonBody?: Object
}

declare interface IRequestMock {
  request: IRequest
  response: IResponse
}
