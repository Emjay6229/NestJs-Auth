import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // strips out elements not defined in the dto
    whitelist: true
  }));
  app.setGlobalPrefix('api/v1');
  await app.listen(3000, () => console.log("app started on port " + process.env.port));
}
bootstrap();
