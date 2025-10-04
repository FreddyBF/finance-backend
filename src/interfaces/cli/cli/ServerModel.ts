import express from 'express';
import * as http from 'http';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { routeIndex } from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/swagger.yaml'));

export class Server {
    private readonly _port: string;
    private readonly _app: express.Express;
    private _httpServer?: http.Server;

    constructor(port: string) {
        this._port = port;
        this._app = express();

        // Segurança
        this._app.use(helmet());

        // Performance
        this._app.use(compression());

        // Limite de requisições (rate limiting)
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // Máximo de 100 requisições por IP
            standardHeaders: true,
            legacyHeaders: false,
        });
        this._app.use(limiter);

        // Limite de payload
        this._app.use(express.json({ limit: '1mb' }));

        // Logs
        this._app.use(morgan('combined'));

        // Rotas
        this._app.use('/api/v1', routeIndex);

        // Documentação Swagger
        this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    async boot(): Promise<void> {
        return await new Promise((resolve) => {
            this._httpServer = this._app.listen(this._port, () => {
                console.log(` Finance Backend App rodando em http://localhost:${this._port}`);
                console.log(`Pressione CTRL-C para parar`);
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
            } else {
                return resolve();
            }
        });
    }
}
