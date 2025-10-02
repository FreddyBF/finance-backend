import { z } from 'zod';

export const createMovimentoBodySchema = z.object({
    saldo: z.number().positive('O saldo deve ser um valor posetivo'),

    tipo: z.enum(['RECEITA', 'DESPESA']).refine((val) => val === 'RECEITA' || val === 'DESPESA', {
        message: 'O tipo de movimento deve ser "RECEITA" ou "DESPESA"',
    }),

    data: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data inválida',
    }),
});

export const updateMovimentoBodySchema = createMovimentoBodySchema.extend({
    id: z.number().positive(),
});
