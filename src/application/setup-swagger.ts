import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, swaggerPath: string, apiVersion: string): void {
  const options = new DocumentBuilder().setTitle('API Documentation').setVersion(apiVersion).addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document);
}
