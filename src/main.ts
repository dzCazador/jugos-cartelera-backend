import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common';
import {envs} from './configuration'
import * as cors from 'cors';
import * as serveStatic from 'serve-static';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Logger is used to log messages in the console
  const logger = new Logger('Main')

  app.useGlobalFilters(new HttpExceptionFilter())
  //CORS
  app.use(cors({
    origin: 'http://localhost:3001', // Permitir solicitudes desde tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  // Setea el prefijo para las rutas
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      // Permite solo el ingreso de propiedades seteadas en el DTO
      whitelist:true,
      forbidNonWhitelisted:true
    }
    )
  )

  //Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('API REST CARTELERA')
    .addBearerAuth()
    .setDescription('API REST documentation')
    .setVersion('1.0')
    .addTag('examples')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  // Servir el sitio estático desde la raíz
  app.use('/', serveStatic(join(__dirname, '..', 'public'))); // Asegúrate de que la ruta 'public' sea correcta


  await app.listen(envs.port);
  logger.log(`Server listening on port: ${envs.port}`)
}
bootstrap();
