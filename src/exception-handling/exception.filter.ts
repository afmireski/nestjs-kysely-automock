import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InternalException } from './internal.exception';
import { Response } from 'express';
import { getErrorMessages } from './errors/get-error-messages';

@Catch(InternalException)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: InternalException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { code, httpCode, message } = getErrorMessages(exception.getCode);

    response.status(httpCode).json({
      statusCode: httpCode,
      internalCode: code,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
