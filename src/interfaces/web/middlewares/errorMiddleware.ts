import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../helper/apiResponse';

const exceptionStatusMap = new Map<string, number>([
    ['TransactionNotFoundException', 404],
    ['EmailAlreadyExistsException', 409],
    ['InvalidPasswordException', 401],
    ['UnauthorizedException', 403],
    ['UserNotFoundException', 404],
    ['InvalidBalanceException', 400],
    ['InvalidTransactionTypeException', 400],
    ['InvalidEmailException', 400],
    ['InvalidUpdateTranscationException', 400],
]);

export function errorHandler(error: Error, _: Request, res: Response, next: NextFunction) {
    const statusCode = exceptionStatusMap.get(error.constructor.name);
    if (statusCode) {
        return res
            .status(statusCode)
            .json(ApiResponse.fail<Error>(error.constructor.name, error.message));
    }

    console.log(`Erro não tratado: ${error.stack} - ${error.message}`);
    return res
        .status(500)
        .json(ApiResponse.fail<Error>('INTERNAL_SERVER_ERROR', 'Internal server Error'));
}
