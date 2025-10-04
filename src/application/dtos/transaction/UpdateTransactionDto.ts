import { InvalidUpdateTranscationException } from '../../exceptions/InvalidUpdateTransactionException';
export interface UpdateTransactionDTO {
    userId: number;
    /** ID da transção **/
    id: number;
    date?: Date;
    transactionType?: string;
    balance?: number;
}

export function validateUpdate(dto: UpdateTransactionDTO) {
    const { date, transactionType, balance } = dto;
    if (date === undefined && transactionType === undefined && balance === undefined) {
        throw new InvalidUpdateTranscationException();
    }
}
