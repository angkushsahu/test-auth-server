import { HttpException } from "@nestjs/common";

export class ErrorHandler extends HttpException {
   statusCode: number = 500;
   constructor(message: string | string[] = "Internal server error", statusCode: number = 500) {
      super(message, statusCode);
      this.statusCode = statusCode;

      Error.captureStackTrace(this, this.constructor);
   }
}
