import { Server } from './Server';
import dotenv from 'dotenv';
dotenv.config();

export class App {
    server?: Server;

    async start(): Promise<void> {
        const port = process.env.PORT; //'3000';
        this.server = new Server(port);
        return await this.server.boot();
    }

    async stop(): Promise<void> {
        return await this.server.stop();
    }
}
