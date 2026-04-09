import { cleanupOpenApiDoc } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  const isNotProduction = configService.get('NODE_ENV') !== 'production';

  if (isNotProduction) {
    const config = new DocumentBuilder()
      .setTitle('CTD Animal API')
      .setDescription('API para gerenciamento de animais')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const openApiDoc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, cleanupOpenApiDoc(openApiDoc), {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
    console.log("Swagger UI is enabled (Development Mode)");
  }

  const PORT = configService.get('PORT') || 3000;
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
bootstrap();