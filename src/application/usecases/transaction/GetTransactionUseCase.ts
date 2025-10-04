import { ListTransactionInputDTO } from '../../dtos/transaction/ListTransactionInputDto';
import { ListTransactionOutputDTO } from '../../dtos/transaction/ListTransactionOutputDto';
import { TransactionRepositoryPort } from '../../ports/TransactionRepositoryPort';
import { TransactionMapper } from '../../mappers/TransactionMapper';

export class GetTransactionsUseCase {
    constructor(private readonly transactionRepository: TransactionRepositoryPort) {}

    async execute(input: ListTransactionInputDTO): Promise<ListTransactionOutputDTO> {
        const transactions = await this.transactionRepository.getAll(
            input.userId,
            input.limit,
            input.skip,
            input.dataInicio,
            input.dataFim
        );

        return TransactionMapper.entityToListDto(transactions);
    }
}
