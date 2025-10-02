import { UpdateMovimentoException } from '../../../domain/exceptions/UpdateMovimentoException';

export interface UpdateMovimentoDTO {
    userId: number;
    id: number;
    data?: Date;
    tipoMovimento?: string;
    saldo?: number;
}

export function validateUpdate(dto: UpdateMovimentoDTO) {
    const { data, tipoMovimento, saldo } = dto;
    if (data === undefined && tipoMovimento === undefined && saldo === undefined) {
        throw new UpdateMovimentoException();
    }
}
