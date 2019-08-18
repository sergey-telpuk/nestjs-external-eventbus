import {IEventWithTransport} from '../../event-bus-transport/interface/event.with.transport.interface';
import {Transport} from '../../event-bus-transport/transport.enum';

export class ContrivedEvent implements IEventWithTransport {
    TRANSPORTS = [Transport.RMQ, Transport.DEF, Transport.REDIS];

    constructor(
    ) {}
}
