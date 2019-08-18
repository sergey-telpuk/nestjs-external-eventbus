import {IEvent, IEventPublisher} from '@nestjs/cqrs';
import {Transport} from './transport.enum';
import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export abstract class AbstractPublisher implements IEventPublisher {
    abstract TRANSPORT: Transport;
    abstract PATTERN: string;

    constructor(
        protected readonly log: Logger,
    ) {

    }

    publish<T extends IEvent>(event: T): void {

        const data = {
            payload: event,
            event: event.constructor.name,
        };

        this.getClient(this.PATTERN, data);
    }

    protected abstract getClient(pattern: any, data: any): any;
}
