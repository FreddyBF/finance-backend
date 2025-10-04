import { Transaction } from '../../../domain/entities/transaction/Transaction';
import { TransactionRepositoryPort } from '../../../application/ports/TransactionRepositoryPort';

export class InMemoryTransactionRepository implements TransactionRepositoryPort {
    private transactions: Transaction[] = [];

    public async save(transaction: Transaction): Promise<Transaction> {
        const id = this.transactions.length + 1;
        const restored = Transaction.restore(
            id,
            transaction.userId,
            transaction.date,
            transaction.type,
            Math.abs(transaction.balance)
        );
        this.transactions.push(restored);
        return restored;
    }

    public async update(transaction: Transaction): Promise<Transaction> {
        const index = this.transactions.findIndex(
            (t) => t.id === transaction.id && t.userId === transaction.userId
        );
        if (index === -1) {
            throw new Error('Transaction not found');
        }
        this.transactions[index] = transaction;
        return transaction;
    }

    public async delete(id: number, userId: number): Promise<void> {
        this.transactions = this.transactions.filter((t) => !(t.id === id && t.userId === userId));
    }

    public async count(): Promise<number> {
        return this.transactions.length;
    }

    public async getAll(
        userId: number,
        limit?: number,
        skip?: number,
        dataInicio?: Date,
        dataFinal?: Date
    ): Promise<Transaction[]> {
        let result = this.transactions.filter((t) => t.userId === userId);

        if (dataInicio && dataFinal) {
            result = result.filter(
                (t) =>
                    t.date.getTime() >= dataInicio.getTime() &&
                    t.date.getTime() <= dataFinal.getTime()
            );
        }

        if (typeof skip === 'number') {
            result = result.slice(skip);
        }
        if (typeof limit === 'number') {
            result = result.slice(0, limit);
        }

        return result;
    }

    public async findById(id: number, userId: number): Promise<Transaction | null> {
        return this.transactions.find((t) => t.id === id && t.userId === userId) || null;
    }
}
