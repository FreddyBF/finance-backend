import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';
import { TransactionBalanceCalculator } from '../../../domain/services/TransactionBalanceCalculator';
import { GetBalanceOutputDTO } from '../../dtos/transaction/GetBalanceOutputDto';

export class GetBalanceUseCase {
    constructor(
        private readonly transactionBalanceCalculator: TransactionBalanceCalculator,
        private readonly transactionRepository: TransactionRepositoryPort
    ) {}

    async execute(userId: number): Promise<GetBalanceOutputDTO> {
        console.log(`Use case- ${userId}`);
        const transactionList = await this.transactionRepository.getAll(userId);
        const balance = this.transactionBalanceCalculator.execute(transactionList);
        return {
            date: new Date(),
            balance: balance,
        };
    }
}
