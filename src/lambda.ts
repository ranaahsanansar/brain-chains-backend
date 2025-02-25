import { configure as serverlessExpress } from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // Ensure large payloads can be processed
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Brainchains')
    .setDescription('Brainchains API description')
    .setVersion('1.0')
    .addTag('brainchains')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  // Ensure body is correctly parsed
  if (event.isBase64Encoded && event.body) {
    event.body = Buffer.from(event.body, 'base64').toString('utf-8');
  }
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
