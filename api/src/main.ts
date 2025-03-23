import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // cors: process.env.ENVIRONMENT == 'development',
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  // app.header('Access-Control-Allow-Origin', '*');
  // app.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
