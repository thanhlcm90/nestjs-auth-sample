import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import {Response} from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      // print the error into logger so that we can check with timespan
      this.logger.error(exception);
      console.trace(exception);
    }

    const body = typeof message === "string" ? {message} : message;

    response.status(status).json({
      ...body,
      timestamp: new Date().toISOString(),
    });
  }
}
