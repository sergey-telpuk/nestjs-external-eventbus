import {Logger, Module} from '@nestjs/common';
import {EventBusSubscriberService} from './services/event.subscriber.service';
import {ContrivedEventHandler} from './events/contrived/contrived.event.handler';
import {ContrivedEvent} from './events/contrived/contrived.event';
import {CqrsModule} from '@nestjs/cqrs';

// events handlers
export const EventHandlers = [
    ContrivedEventHandler,
];

// events
export const Events = {ContrivedEvent};

@Module({
    imports: [
        CqrsModule,
    ],
    controllers: [
        EventBusSubscriberService,
    ],
    providers: [
        ...EventHandlers,
        Logger,
    ],
})
export class AppModule {
}
