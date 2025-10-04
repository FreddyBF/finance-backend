import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';

export class DeleteTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    async execute(id: number, userId: number): Promise<void> {
        await this.transactionRepository.delete(id, userId);
    }
}
