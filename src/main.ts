import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transofrmar la data que llega a los servicios
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
