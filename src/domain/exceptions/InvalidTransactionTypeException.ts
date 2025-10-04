export class InvalidTransactionTypeException extends Error {
    constructor(type: string) {
        super(`Tipo de transação inválido: "${type}". Esperado "RECEITA" ou "DESPESA".`);
        this.name = 'InvalidTransactionTypeException';
    }
}
