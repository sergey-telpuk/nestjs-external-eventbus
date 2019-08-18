import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, Logger, ValidationPipe} from '@nestjs/common';
import fs from 'fs';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
const log = new Logger('app: ');

(async function bootstrap() {
    const fastifyAdapter = new FastifyAdapter({
        http2: true,
        logger: log,
        https: {
            allowHTTP1: true, // fallback support for HTTP1
            key: fs.readFileSync('/app/certs/server.key'),
            cert: fs.readFileSync('/app/certs/server.crt'),
        },
    });

    const app: INestApplication = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
    );
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
        }),
    );

    await app.listen(3000, '0.0.0.0');
})();
