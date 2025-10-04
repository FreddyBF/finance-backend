import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { createUserBodySchema } from '../validation/bodyUserSchema';
import { userController } from '../../../config/container';

const userRouter = Router();

userRouter.post(
    '/register',
    validateMiddleware(createUserBodySchema, 'body'),
    userController.userRegist
);

userRouter.post('/login', userController.userLogin);

export { userRouter };
