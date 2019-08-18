import {IEvent, IEventPublisher} from '@nestjs/cqrs';
import {Transport} from './transport.enum';
import {Logger} from '@nestjs/common';

export abstract class AbstractPublisher implements IEventPublisher {
    abstract TRANSPORT: Transport;
    abstract PATTERN: string;

    constructor(
        protected readonly log: Logger,
    ) {

    }

    async publish<T extends IEvent>(event: T) {

        const data = {
            payload: event,
            event: event.constructor.name,
        };

        await this.getClient(this.PATTERN, data);
    }

    protected abstract getClient(pattern: any, data: any): any;
}
