import {Injectable} from '@nestjs/common';
import {Client, ClientProxy, Transport} from '@nestjs/microservices';
import {AbstractPublisher} from '../abstract.publisher';


@Injectable()
export class RedisPublisher extends AbstractPublisher {
    TRANSPORT = Transport.REDIS;
    PATTERN = 'event_bus';

    @Client({
        transport: Transport.REDIS,
        options: {
            url: 'redis://:password123@redis:6379',
        },
    })
    client: ClientProxy;

    protected async send(pattern: any, data: any) {
        // try {
        await this.client.send(pattern, data).toPromise();
        console.log('============');
        // } catch (e) {
        //     this.log.error(e);
        // }
    }
}
