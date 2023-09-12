import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ErrorHandler } from "./errorHandler";

@Catch(ErrorHandler)
export class AppExceptionFilter implements ExceptionFilter {
   constructor(private httpAdapterHost: HttpAdapterHost) {}

   catch(error: ErrorHandler, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse();
      const { statusCode, message } = error;
      const { httpAdapter } = this.httpAdapterHost;

      httpAdapter.reply(response, { success: false, message }, statusCode);
   }
}
