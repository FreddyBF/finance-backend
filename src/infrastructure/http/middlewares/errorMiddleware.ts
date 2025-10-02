import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../helper/apiResponse';

const exceptionStatusMap = new Map<string, number>([
    ['NotFoundMovimentoException', 404],
    ['EmailAlRedyExistException', 409],
    ['SenhaIncorretaException', 401],
    ['UnauthorizedException', 403],
    ['UserNotFoundException', 404],
    ['EmailInvalidoError', 400],
    ['SaldoInvalidoException', 400],
    ['TipoMovimentoInvalidoException', 400],
    ['UpdateMovimentoException', 500],
]);

export function erroHandler(error: Error, _: Request, res: Response, next: NextFunction) {
    const statusCode = exceptionStatusMap.get(error.constructor.name);
    if (statusCode) {
        return res
            .status(statusCode)
            .json(ApiResponse.fail<Error>(error.constructor.name, error.message));
    }

    console.log(`Erro não tratado: ${error.constructor.name} - ${error.message}`);
    return res
        .status(500)
        .json(ApiResponse.fail<Error>('INTERNAL_SERVER_ERROR', 'Internal server Error'));
}
