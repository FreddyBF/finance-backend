import { PrismaClient } from '@prisma/client';
import { TransactionRepositoryPort } from '../../../application/ports/TransactionRepositoryPort';
import { Transaction } from '../../../domain/entities/transaction/Transaction';

export class TransactionPrismaRepository implements TransactionRepositoryPort {
    private constructor(private readonly prisma: PrismaClient) {}

    public static create(prisma: PrismaClient): TransactionPrismaRepository {
        return new TransactionPrismaRepository(prisma);
    }

    public async save(transaction: Transaction): Promise<Transaction> {
        const tx = await this.prisma.transaction.create({
            data: {
                userId: transaction.userId,
                amount: Math.abs(transaction.amount),
                type: transaction.type,
                date: transaction.date,
            },
        });

        return Transaction.restore(tx.id, tx.userId, tx.date, tx.type, tx.amount);
    }

    public async update(transaction: Transaction): Promise<Transaction | null> {
        const tx = await this.prisma.transaction.update({
            where: { id: transaction.id },
            data: {
                amount: transaction.amount,
                type: transaction.type,
                date: transaction.date,
            },
        });

        return Transaction.restore(tx.id, tx.userId, tx.date, tx.type, tx.amount);
    }

    public async delete(id: number, userId: number): Promise<void> {
        await this.prisma.transaction.deleteMany({
            where: { id, userId },
        });
    }

    public async getAll(
        userId: number,
        limit?: number,
        skip?: number,
        dataInicio?: Date,
        dataFinal?: Date
    ): Promise<Transaction[]> {
        const txs = await this.prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: dataInicio,
                    lte: dataFinal,
                },
            },
            take: limit,
            skip,
        });

        return txs.map((tx) => Transaction.restore(tx.id, tx.userId, tx.date, tx.type, tx.amount));
    }

    public async findById(id: number, userId: number): Promise<Transaction | null> {
        const tx = await this.prisma.transaction.findFirst({
            where: { id, userId },
        });

        return tx ? Transaction.restore(tx.id, tx.userId, tx.date, tx.type, tx.amount) : null;
    }

    public async count(): Promise<number> {
        return this.prisma.transaction.count();
    }
}
