import { Transaction } from '../../domain/entities/transaction/Transaction';

export interface TransactionRepositoryPort {
    save: (transaction: Transaction) => Promise<Transaction>;

    update: (transaction: Transaction) => Promise<Transaction | null>;

    delete: (id: number, userId: number) => Promise<void>;

    getAll: (
        userId: number,
        limit?: number,
        skip?: number,
        dataInicio?: Date,
        dataFinal?: Date
    ) => Promise<Transaction[]>;

    findById: (id: number, userId: number) => Promise<Transaction | null>;

    count(): Promise<number>;
}
