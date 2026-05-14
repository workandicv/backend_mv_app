"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MEIVOLTA API')
        .setDescription('MEIVOLTA - App de Mobilidade e Turismo em Boa Vista, Cabo Verde')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
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
//# sourceMappingURL=main.js.map