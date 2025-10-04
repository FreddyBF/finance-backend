import { z } from 'zod';

export const listtransactionQuerySchema = z.object({
    limit: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val > 0, {
            message: 'limit deve ser um número positivo',
        }),
    skip: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 0, {
            message: 'skip deve ser um número válido',
        }),
    dataInicio: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'dataInicio inválida',
        }),
    dataFim: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'dataFim inválida',
        }),
});
