import { InvalidUpdateTranscationException } from '../../exceptions/InvalidUpdateTransactionException';
export interface UpdateTransactionDTO {
    userId: number;
    /** ID da transção **/
    id: number;
    date?: Date;
    transactionType?: string;
    amount?: number;
}

export function validateUpdate(dto: UpdateTransactionDTO) {
    const { date, transactionType, amount } = dto;
    if (date === undefined && transactionType === undefined && amount === undefined) {
        throw new InvalidUpdateTranscationException();
    }
}
