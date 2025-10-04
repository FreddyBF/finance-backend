import { Router } from 'express';
import { transactionController } from '../../../config/container';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { listtransactionQuerySchema } from '../validation/querySchema';
import { transactionIdParamSchema } from '../validation/paramsSchema';
import { createtransactionBodySchema } from '../validation/bodySchema';
const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.get(
    '/',
    validateMiddleware(listtransactionQuerySchema, 'query'),
    transactionController.getTransactions
);

transactionRouter.get('/balance', transactionController.getBalance);

transactionRouter.post(
    '/',
    validateMiddleware(createtransactionBodySchema, 'body'),
    transactionController.createTransaction
);

transactionRouter.delete(
    '/:id',
    validateMiddleware(transactionIdParamSchema, 'params'),
    transactionController.deleteTransaction
);

transactionRouter.patch(
    '/:id',
    validateMiddleware(transactionIdParamSchema, 'params'),
    transactionController.updateTransaction
);

export { transactionRouter };
