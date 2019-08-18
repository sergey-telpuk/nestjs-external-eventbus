import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from '@nestjs/microservices';
import {Logger} from '@nestjs/common';

const log = new Logger('event-service: ');

(async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        logger: log,
        transport: Transport.REDIS,
        options: {
            url: 'redis://:password123@redis:6379',
        },
    });

    await app.listen(() => {
        log.verbose('Redis Event Service is running.');
    });
})();
