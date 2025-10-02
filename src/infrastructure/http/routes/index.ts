import { Router } from 'express';
import { movimentoRouter } from './MovimentoRoute';
import { userRouter } from './UserRoute';

export const routeIndex = Router();
routeIndex.use('/auth', userRouter);
routeIndex.use('/movimentos', movimentoRouter);
