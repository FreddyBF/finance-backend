import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';
import { UpdateTransactionDTO, validateUpdate } from '../../dtos/transaction/UpdateTransactionDto';
import { Transaction } from '../../../domain/entities/transaction/Transaction';
import { TransactionNotFoundException } from '../../../domain/exceptions/TransactionNotFoundException';
import { TransactionOutputDTO } from '../../dtos/transaction/TransactionOutputDto';
import { TransactionMapper } from '../../mappers/TransactionMapper';

export class UpdateTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    async execute(dto: UpdateTransactionDTO): Promise<TransactionOutputDTO> {
        validateUpdate(dto);

        const existingTransaction = await this.transactionRepository.findById(dto.id, dto.userId);
        if (!existingTransaction) {
            throw new TransactionNotFoundException();
        }

        const updatedTransaction = Transaction.restore(
            dto.id,
            dto.userId,
            dto.date ?? existingTransaction.date,
            dto.transactionType ?? existingTransaction.type,
            dto.balance ?? Math.abs(existingTransaction.balance) // balance is normalized; entity applies sign based on type
        );
        const savedTransaction = await this.transactionRepository.update(updatedTransaction);
        return TransactionMapper.entityToDto(savedTransaction);
    }
}
