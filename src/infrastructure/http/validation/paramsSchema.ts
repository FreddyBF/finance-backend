import { z } from 'zod';

export const movimentoIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'id deve ser numérico'),
});
