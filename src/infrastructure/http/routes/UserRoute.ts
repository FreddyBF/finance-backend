import { Router } from 'express';
import { usuarioController } from '../../config/config';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { createUsuarioBodySchema } from '../validation/bodyUserSchema';
const userRouter = Router();

userRouter.post(
    '/register',
    validateMiddleware(createUsuarioBodySchema, 'body'),
    usuarioController.registarUsuario
);

userRouter.post('/login', usuarioController.userLogin);

export { userRouter };
