import { Router } from 'express';
import { movimentoController } from '../../config/config';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { listMovimentoQuerySchema } from '../validation/querySchema';
import { movimentoIdParamSchema } from '../validation/paramsSchema';
import { createMovimentoBodySchema } from '../validation/bodySchema';
const movimentoRouter = Router();

movimentoRouter.use(authMiddleware);

movimentoRouter.get(
    '/',
    validateMiddleware(listMovimentoQuerySchema, 'query'),
    movimentoController.listarMovimento
);

movimentoRouter.get('/saldo', movimentoController.consultarSaldo);

movimentoRouter.post(
    '/',
    validateMiddleware(createMovimentoBodySchema, 'body'),
    movimentoController.criarMovimento
);

movimentoRouter.delete(
    '/:id',
    validateMiddleware(movimentoIdParamSchema, 'params'),
    movimentoController.apagarMovimento
);

movimentoRouter.patch(
    '/:id',
    validateMiddleware(movimentoIdParamSchema, 'params'),
    movimentoController.atualizarMovimento
);

export { movimentoRouter };
