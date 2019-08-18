import {Injectable, UsePipes} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {EventBus} from '@nestjs/cqrs';
import {plainToClass} from 'class-transformer';
import {Events} from '../app.module';
import {JsonParsePipe} from '../pipes/json.parse.pipe';

@Injectable()
export class EventBusSubscriberService {

    constructor(
        private readonly eventBus: EventBus,
    ) {

    }

    @EventPattern('event_bus')
    @UsePipes(new JsonParsePipe())
    async subscribe(data: any) {
        try {
            const event = Events[data.event];

            if (!event) {
                throw new Error(`Not such ${data.event}.`);
            }

            this.eventBus.publish(plainToClass(event, data.payload));
        } catch {
            // TODO
        }
    }
}
