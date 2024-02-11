export class HTTPError extends Error {
  code: number
  isHttpError: boolean = true
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

const HttpErrors = {
  NotFound: (msg = "Not found") => new HTTPError(404, msg),
  BadRequest: (msg: string) => new HTTPError(400, msg)
}

export default HttpErrors
