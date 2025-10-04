import { Router } from 'express';
import { transactionRouter } from './TransactionRoute';
import { userRouter } from './UserRoute';

export const routeIndex = Router();
routeIndex.use('/auth', userRouter);
routeIndex.use('/transactions', transactionRouter);
