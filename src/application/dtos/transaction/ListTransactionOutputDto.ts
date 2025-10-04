import { TransactionOutputDTO } from './TransactionOutputDto';

export interface ListTransactionOutputDTO {
    /** Total number of transactions found */
    total?: number;

    /** Current page of the listing */
    page?: number;

    /** Maximum number of items per page */
    limit?: number;

    /** List of formatted transactions */
    list: TransactionOutputDTO[];

    /** Date range of the query (optional) */
    period?: string | null;
}
