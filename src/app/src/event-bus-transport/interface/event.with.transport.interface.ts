import {IEvent} from '@nestjs/cqrs';
import {Transport} from '../transport.enum';

export interface IEventWithTransport extends IEvent {
    TRANSPORTS: Transport[];
}
