import { z } from 'zod';

export const transactionIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'id deve ser numérico'),
});
