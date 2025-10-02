import { z } from 'zod';

export const createUsuarioBodySchema = z.object({
    nome: z.string().min(6),
    email: z.email('email inválido'),
    senha: z.string(),
});

export const loginUsuarioSchema = z.object({
    email: z.email(),
    senha: z.string(),
});
