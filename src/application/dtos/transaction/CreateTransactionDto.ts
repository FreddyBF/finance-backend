export type TransactionType = 'despesa' | 'receita';

export interface CreateTransactionDto {
    userId: number;
    date: Date;
    type: TransactionType;
    amount: number;
}
