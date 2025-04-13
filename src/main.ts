import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const config = new DocumentBuilder()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .addBearerAuth()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .setTitle('ChatBot')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .setDescription('ChatBot With Nest js')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .setVersion('1.0')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .build();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const document = SwaggerModule.createDocument(app, config);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://chatbot-production-7f9b.up.railway.app',
    ],
    Credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
