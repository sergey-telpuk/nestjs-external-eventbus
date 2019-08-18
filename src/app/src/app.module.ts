import {Module} from '@nestjs/common';
import {ContrivedController} from './controllers/contrived.controller';
import {EventBusTransportModule} from './event-bus-transport/event.bus.transport.module';
import {CqrsModule} from '@nestjs/cqrs';
import {RabbitPublisher} from './event-bus-transport/publishers/rabbit.publisher';
import {ContrivedEventHandler} from './events/contrived/contrived.event.handler';
import {RedisPublisher} from "./event-bus-transport/publishers/redis.publisher";

@Module({
    imports: [
        CqrsModule,
        EventBusTransportModule.forRoot(
            [
                RabbitPublisher,
                RedisPublisher
            ],
            [
                ContrivedEventHandler,
            ]),
    ],
    controllers: [
        ContrivedController,
    ],
    providers: [

    ],
})
export class AppModule {
}
