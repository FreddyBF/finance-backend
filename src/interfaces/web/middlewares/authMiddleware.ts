import { NextFunction, Response } from 'express';
import { jwtService } from '../../../config/container';
import { AuthenticatedRequest } from '../../../types/express';

export function authMiddleware(req: AuthenticatedRequest, _: Response, next: NextFunction) {
    //Extrai  token da requisao
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || !authHeader.startsWith('Bearer') || authHeader.split(' ').length !== 2) {
            console.log(`Token nao fornecido`);
            throw new Error('InvaliTokenException');
        }
        const [, token] = authHeader.split(' ');
        const decoded = jwtService.verificarToken(token);
        req.userId = decoded.id;
        next();
    } catch (error) {
        next(error);
    }
}
