import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalExceptionFilter } from './exception-handling/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new InternalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
