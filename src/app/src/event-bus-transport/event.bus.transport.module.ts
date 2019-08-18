import {DynamicModule, Logger, Module} from '@nestjs/common';
import {RabbitPublisher} from './publishers/rabbit.publisher';
import {CqrsModule, EventBus} from '@nestjs/cqrs';
import {EventBusTransport} from './event.bus.transport';
import {DefaultPubSub} from '@nestjs/cqrs/dist/helpers/default-pubsub';
import {ModuleRef} from '@nestjs/core';

@Module({
    imports: [
        CqrsModule,
    ],
    providers: [
        RabbitPublisher,
        DefaultPubSub,
    ],
    exports: [],

})
export class EventBusTransportModule {

    static forRoot(publishers: any[], handlers: any[]): DynamicModule {

        return {
            module: EventBusTransportModule,
            providers: [
                Logger,
                ...publishers,
                {
                    provide: EventBusTransport,
                    useFactory: (eventBus: EventBus, moduleRef: ModuleRef) => {
                        return new EventBusTransport(
                            eventBus,
                            moduleRef,
                            publishers,
                        );
                    },
                    inject: [EventBus, ModuleRef],
                },
                ...handlers,
            ],
            exports: [
                EventBusTransport,
            ],
        };
    }

}
