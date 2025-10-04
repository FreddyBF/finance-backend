import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { ApiResponse } from '../helper/apiResponse';

type RequestPart = 'body' | 'query' | 'params';

/**
 * Middleware genérico de validação para Express usando Zod.
 *
 * @param schema - Schema Zod que define a estrutura esperada.
 * @param part - Parte da requisição a ser validada ('body', 'query', 'params'). Padrão: 'body'.
 *
 * @returns Middleware Express que valida e substitui os dados validados no req.
 */

export const validateMiddleware =
    <T extends ZodType<any, any>>(schema: T, part: RequestPart = 'body') =>
    (req: Request, res: Response, next: NextFunction) => {
        const obj = req[part];
        const result = schema.safeParse(obj);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));
            res.status(422).json(
                ApiResponse.fail('Validation Error', 'Alguns campos estão incorretos.', errors)
            );
            return;
        }

        // Armazena os dados validados em um campo separado
        switch (part) {
            case 'body':
                req.body = result.data;
                break;
            case 'params':
                req.params = result.data;
                break;
            case 'query':
                (req as any).validatedQuery = result.data;
                break;
        }

        next();
    };
