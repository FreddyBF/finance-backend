import { Transaction } from '../../domain/entities/transaction/Transaction';
import { ListTransactionOutputDTO } from '../dtos/transaction/ListTransactionOutputDto';
import { TransactionOutputDTO } from '../dtos/transaction/TransactionOutputDto';

export class TransactionMapper {
    public static entityToDto(transaction: Transaction): TransactionOutputDTO {
        return {
            id: transaction.id,
            typeTransaction: transaction.type?.toLowerCase() ?? 'desconhecido',
            balance: transaction.balance,
            date: transaction.date,
        };
    }

    public static entityToListDto(
        transactions: Transaction[],
        dataInicio?: Date,
        dataFim?: Date
    ): ListTransactionOutputDTO {
        const filtradas = transactions.filter((transaction) => {
            const dataTransacao = new Date(transaction.date);
            if (dataInicio && dataTransacao < dataInicio) return false;
            if (dataFim && dataTransacao > dataFim) return false;
            return true;
        });

        return {
            list: filtradas.map(TransactionMapper.entityToDto),
        };
    }
}
