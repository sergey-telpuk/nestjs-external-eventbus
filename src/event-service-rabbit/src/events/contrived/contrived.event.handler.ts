import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ContrivedEvent} from './contrived.event';
import {Logger} from '@nestjs/common';

@EventsHandler(ContrivedEvent)
export class ContrivedEventHandler implements IEventHandler<ContrivedEvent> {
    constructor(
        private readonly log: Logger,
    ) {

    }

    handle(event: ContrivedEvent) {
        this.log.verbose('ContrivedEventHandler: event\n');
        this.log.log(event);
    }
}
