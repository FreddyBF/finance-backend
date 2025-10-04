import { z } from 'zod';

export const createUserBodySchema = z.object({
    name: z.string().min(6),
    email: z.email('email inválido'),
    password: z.string(),
});

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string(),
});
