import { Router } from 'express';
import { movimentoRouter } from './MovimentoRoute';
import { userRouter } from './UserRoute';
import { erroHandler } from '../middlewares/errorMiddleware';

export const routeIndex = Router();
routeIndex.use('/auth', userRouter);
routeIndex.use('/movimentos', movimentoRouter);
routeIndex.use(erroHandler);
