import express from 'express';
import * as http from 'http';
import morgan from 'morgan';
import { routeIndex } from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { erroHandler } from './middlewares/errorMiddleware';

const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/swagger.yaml'));

export class Server {
    private readonly _port: string;
    private readonly _app: express.Express;
    private _httpServer?: http.Server;

    constructor(port: string) {
        this._port = port;
        this._app = express();
        this._app.use(express.json());
        this._app.use(morgan('dev'));
        this._app.use('/api/v1', routeIndex);
        this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this._app.use(erroHandler);
    }

    async boot(): Promise<void> {
        return await new Promise((resolve) => {
            this._httpServer = this._app.listen(this._port, () => {
                console.log(`Finance Backend App is running at http://localhost:${this._port}`);
                console.log(`Press CTRL-C to stop`);
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._httpServer != null) {
                this._httpServer.close((error) => {
                    if (error != null) return reject(error);
                    return resolve();
                });
            }
            return resolve();
        });
    }
}
