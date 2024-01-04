import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  const documentConfig = new DocumentBuilder()
    .setTitle('Exchange Rate Calculator')
    .setDescription('API for calculating exchange rates')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(
    configService.getOrThrow<number>('PORT'),
    configService.getOrThrow<string>('HOST'),
  );
}
bootstrap();
