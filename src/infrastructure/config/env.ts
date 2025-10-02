import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Variável de ambiente obrigatória não definida: ${key}`);
  return value;
}

function requireIntEnv(key: string): number {
  const value = parseInt(requireEnv(key), 10);
  if (isNaN(value)) throw new Error(`Variável ${key} deve ser um número válido`);
  return value;
}

export const env = {
  DATABASE_URL: requireEnv('DATABASE_URL'),
  PORT: requireEnv('PORT'),
  ACCESS_SECRET: requireEnv('JWT_SECRET'),
  JWT_EXPIRATION: requireEnv('JWT_EXPIRES_IN').trim(),
  SALT_ROUNDS: requireIntEnv('SALT_ROUNDS'),
} as const;
