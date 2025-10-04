export class TransactionNotFoundException extends Error {
    constructor(message?: string) {
        super(message ?? 'transação não encontrada');
        this.name = 'TransactionNotFoundException';
    }
}
