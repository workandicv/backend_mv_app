import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MEIVOLTA API')
    .setDescription('MEIVOLTA - App de Mobilidade e Turismo em Boa Vista, Cabo Verde')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'MEIVOLTA API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui { background-color: #ffffff; }
      .swagger-ui .info .title { color: #00CED1; font-size: 2.5rem; }
      .swagger-ui .info .description { color: #333; }
      .swagger-ui .opblock-tag { border-bottom: 2px solid #F5E6D3; }
      .swagger-ui .opblock.opblock-post { border-color: #00CED1; background: rgba(0, 206, 209, 0.05); }
      .swagger-ui .opblock.opblock-get { border-color: #00CED1; background: rgba(0, 206, 209, 0.02); }
      .swagger-ui .opblock.opblock-put { border-color: #F5E6D3; background: rgba(245, 230, 211, 0.1); }
      .swagger-ui .opblock.opblock-delete { border-color: #ff6b6b; background: rgba(255, 107, 107, 0.05); }
      .swagger-ui .btn.authorize { background-color: #00CED1; border-color: #00CED1; }
      .swagger-ui .btn.execute { background-color: #00CED1; border-color: #00CED1; }
    `,
    customfavIcon: 'https://cdn-icons-png.flaticon.com/512/3097/3097126.png',
  });

  await app.listen(3001, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3001");
  });
  
}
bootstrap();
