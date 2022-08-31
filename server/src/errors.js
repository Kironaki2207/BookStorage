const {STATUS_CODES} = require('http').STATUS_CODES

class HttpError extends Error {
  constructor(message = 'Internal Server Error', statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.error = STATUS_CODES[statusCode] ?? message
  }
}

class HttpConflict extends HttpError {
  constructor(message) {
    super(message, 409)
  }
}

class HttpForbidden extends HttpError {
  constructor(message) {
    super(message, 403)
  }
}

class HttpNotFound extends HttpError {
  constructor(message) {
    super(message, 404)
  }
}
class HttpUnauthorized extends HttpError {
  constructor(message) {
    super(message, 401)
  }
}

class HttpBadRequest extends HttpError {
  constructor(message) {
    super(message, 400)
  }
}

module.exports = {
  HttpError,
  HttpConflict,
  HttpForbidden,
  HttpNotFound,
  HttpUnauthorized,
  HttpBadRequest,
}
