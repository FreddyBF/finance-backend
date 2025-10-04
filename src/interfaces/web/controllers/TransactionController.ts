import { Response, NextFunction } from 'express';
import { CreateTransactionUseCase } from '../../../application/usecases/transaction/CreateTransactionUseCase';
import { DeleteTransactionUseCase } from '../../../application/usecases/transaction/DeleteTransactionUseCase';
import { GetTransactionsUseCase } from '../../../application/usecases/transaction/GetTransactionUseCase';
import { UpdateTransactionUseCase } from '../../../application/usecases/transaction/UpdateTransactionUseCase';
import { AuthenticatedRequest } from '../../../types/express';
import { GetAmountOutputDTO } from '../../../application/dtos/transaction/GetAmountOutputDto';
import { ListTransactionInputDTO } from '../../../application/dtos/transaction/ListTransactionInputDto';
import { GetAmountUseCase } from '../../../application/usecases/transaction/GetAmountUseCase';
import { ApiResponse } from '../helper/apiResponse';
import { TransactionOutputDTO } from '../../../application/dtos/transaction/TransactionOutputDto';
import { CreateTransactionDto } from '../../../application/dtos/transaction/CreateTransactionDto';
import { UpdateTransactionDTO } from '../../../application/dtos/transaction/UpdateTransactionDto';

export class TransactionController {
    constructor(
        private readonly GetAmountUseCase: GetAmountUseCase,
        private readonly createTransactionUseCase: CreateTransactionUseCase,
        private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
        private readonly listTransactionsUseCase: GetTransactionsUseCase,
        private readonly updateTransactionUseCase: UpdateTransactionUseCase
    ) {}

    public getAmount = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const amount = await this.GetAmountUseCase.execute(req.userId);
            res.status(200).json(
                ApiResponse.ok<GetAmountOutputDTO>(amount, 'Saldo consultado com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };

    public getTransactions = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { limit, skip, dataInicio, dataFim } = req.query;
            const parsedStartDate = dataInicio ? new Date(dataInicio as string) : undefined;
            const parsedEndDate = dataFim ? new Date(dataFim as string) : undefined;

            const dto: ListTransactionInputDTO = {
                userId: req.userId,
                dataInicio: parsedStartDate,
                dataFim: parsedEndDate,
                limit: Number(limit) || 10,
                skip: Number(skip) || 0,
            };

            const result = await this.listTransactionsUseCase.execute(dto);

            res.status(200).json(
                ApiResponse.ok<TransactionOutputDTO[]>(
                    result.list,
                    'Lista de transações obtida com sucesso',
                    {
                        totalItems: result.total,
                        itemCount: result.list.length,
                        itemsPerPage: dto.limit,
                        totalPages: Math.ceil(result.total / dto.limit),
                        currentPage: Math.floor(dto.skip / dto.limit) + 1,
                    }
                )
            );
        } catch (error) {
            next(error);
        }
    };

    public createTransaction = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { amount, date, type } = req.body;

            const dto: CreateTransactionDto = {
                userId: req.userId,
                date: new Date(date),
                type: type,
                amount: amount,
            };

            const transaction = await this.createTransactionUseCase.execute(dto);

            res.status(201).json(
                ApiResponse.ok<TransactionOutputDTO>(transaction, 'Transação criada com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };

    public deleteTransaction = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await this.deleteTransactionUseCase.execute(Number(id), req.userId);
            res.status(204).json(ApiResponse.ok(null, 'transação deletada com sucesso'));
        } catch (error) {
            next(error);
        }
    };

    public updateTransaction = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { amount, type, date } = req.body;

            const dto: UpdateTransactionDTO = {
                userId: req.userId,
                id: Number(id),
                date: date ? new Date(date) : undefined,
                transactionType: type,
                amount: amount 
            };
            const updated = await this.updateTransactionUseCase.execute(dto);

            res.status(200).json(
                ApiResponse.ok<TransactionOutputDTO>(updated, 'Transação actualizada com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };
}
