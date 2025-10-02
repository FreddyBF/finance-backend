import { Server } from './Server';
import { env } from '../config/env';

export class App {
    server?: Server;

    async start(): Promise<void> {
        const port = env.PORT; //'3000';
        this.server = new Server(port);
        return await this.server.boot();
    }

    async stop(): Promise<void> {
        return await this.server.stop();
    }
}
