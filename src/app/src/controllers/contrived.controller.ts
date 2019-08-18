import {Controller, Get} from '@nestjs/common';
import {EventBusTransport} from '../event-bus-transport/event.bus.transport';
import {ContrivedEvent} from '../events/contrived/contrived.event';

@Controller('/')
export class ContrivedController {

    constructor(
        readonly eventBusTransport: EventBusTransport,
    ) {}

    @Get('/contrived')
     contrived() {
        this.eventBusTransport.publish(new ContrivedEvent());
    }

}
