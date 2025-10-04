export interface ListTransactionInputDTO {
    /** ID do usuário para filtrar os dados */
    userId: number;

    /** Data inicial do intervalo de busca */
    dataInicio?: Date;

    /** Data final do intervalo de busca */
    dataFim?: Date;

    /** Quantidade máxima de itens a retornar */
    limit: number;

    /** Quantidade de itens a pular (para paginação) */
    skip: number;
}
