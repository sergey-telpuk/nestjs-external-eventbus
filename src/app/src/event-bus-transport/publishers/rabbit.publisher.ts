import {Injectable} from '@nestjs/common';
import {Client, ClientProxy, Transport} from '@nestjs/microservices';
import {AbstractPublisher} from '../abstract.publisher';

@Injectable()
export class RabbitPublisher extends AbstractPublisher {
    TRANSPORT = Transport.RMQ;
    PATTERN = 'event_bus';

    @Client({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rabbit:rabbit@rabbitmq:5672'],
            queue: 'event_service_queue',
            queueOptions: {
                durable: true,
            },
        },
    })
    client: ClientProxy;

    protected async getClient(pattern: any, data: any) {
        try {
            await this.client.send(pattern, data).toPromise();
        } catch (e) {
            this.log.error(e);
        }
    }
}
