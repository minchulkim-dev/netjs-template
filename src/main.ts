import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { MongoExceptionFilter } from './common/exceptions/mongo.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new MongoExceptionFilter());

  app.setGlobalPrefix('/v1');

  const configService = app.get(ConfigService);
  const { port, env } = configService.get('app');

  // swagger
  const config = new DocumentBuilder().addBearerAuth().build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(
    `Application running on ${await app.getUrl()}, port: ${port}\nEnvironment: ${env}`,
  );
}
bootstrap();
