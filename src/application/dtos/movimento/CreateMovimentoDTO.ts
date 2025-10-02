export interface CreateMovimentoDto {
    userId: number;
    date: Date;
    tipoMovimento: string;
    saldo: number;
}
