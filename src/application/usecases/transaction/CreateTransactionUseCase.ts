import { Transaction } from '../../../domain/entities/transaction/Transaction';
import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';
import { TransactionMapper } from '../../mappers/TransactionMapper';
import { CreateTransactionDto } from '../../dtos/transaction/CreateTransactionDto';
import { TransactionOutputDTO } from '../../dtos/transaction/TransactionOutputDto';

export class CreateTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    async execute(input: CreateTransactionDto): Promise<TransactionOutputDTO> {
        const transaction = Transaction.create(input.userId, input.date, input.type, input.amount);

        const saved = await this.transactionRepository.save(transaction);
        return TransactionMapper.entityToDto(saved);
    }
}
