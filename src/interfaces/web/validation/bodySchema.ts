import { z } from 'zod';

export const createtransactionBodySchema = z.object({
    balance: z.number().positive('O balance deve ser um valor posetivo'),

    type: z.enum(['RECEITA', 'DESPESA']).refine((val) => val === 'RECEITA' || val === 'DESPESA', {
        message: 'O type de transaction deve ser "RECEITA" ou "DESPESA"',
    }),

    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data inválida',
    }),
});

export const updatetransactionBodySchema = createtransactionBodySchema.extend({
    id: z.number().positive(),
});
