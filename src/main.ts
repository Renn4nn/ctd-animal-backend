import { cleanupOpenApiDoc } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuração segura de CORS (Evita chamadas de sites de terceiros indesejados)
  const allowedOrigins = configService.get('ALLOWED_ORIGINS')
    ? configService.get<string>('ALLOWED_ORIGINS')!.split(',')
    : [
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:8080',
      'http://localhost:5173',
      'http://10.0.2.46',
      'https://10.0.2.46',
      'http://200.233.108.3',
      'https://200.233.108.3',
      'https://adocao.ctdlondrina.com.br'
    ];

  app.enableCors({
    origin: (origin, callback) => {
      // Libera se for localhost definido acima, requisições sem origin (mobile/Postman) ou estiver na env
      if (!origin || allowedOrigins.some(o => origin.startsWith(o.trim()))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
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