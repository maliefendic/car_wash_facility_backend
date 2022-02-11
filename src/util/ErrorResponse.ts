interface ErrorResponseInterface{
    statusCode:number;
}

export class ErrorResponse extends Error  implements ErrorResponseInterface {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this ,this.constructor);
    }
    statusCode: number;
  }
  