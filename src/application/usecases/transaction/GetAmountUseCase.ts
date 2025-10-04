import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';
import { TransactionBalanceCalculator } from '../../../domain/services/TransactionBalanceCalculator';
import { GetAmountOutputDTO } from '../../dtos/transaction/GetAmountOutputDto';

export class GetAmountUseCase {
    constructor(
        private readonly transactionamountCalculator: TransactionBalanceCalculator ,
        private readonly transactionRepository: TransactionRepositoryPort
    ) {}

    async execute(userId: number): Promise<GetAmountOutputDTO> {
        const transactionList = await this.transactionRepository.getAll(userId);
        const amount = this.transactionamountCalculator.execute(transactionList);
        return {
            date: new Date(),
            amount: amount,
        };
    }
}
