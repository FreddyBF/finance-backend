import { Request, Response, NextFunction } from 'express';
import { ConsultarSaldoUseCase } from '../../../application/usecases/movimento/ConsultarSaldoUseCase';
import { CreateMovimentoUseCase } from '../../../application/usecases/movimento/CreateMovimentoUseCase';
import { DeleteMovimentoUseCase } from '../../../application/usecases/movimento/DeleteMovimentoUseCase';
import { ListMovimentoUseCase } from '../../../application/usecases/movimento/ListMovimentoUseCase';
import { UpdateMovimentoUseCase } from '../../../application/usecases/movimento/UpdateMovimentoUseCase';
import { ListInputDTO } from '../../../application/dtos/movimento/ListInputDTO';
import { CreateMovimentoDto } from '../../../application/dtos/movimento/CreateMovimentoDTO';
import { UpdateMovimentoDTO } from '../../../application/dtos/movimento/UpdateMovimentoDTO';
import { ApiResponse } from '../helper/apiResponse';
import { MovimentoOutputDTO } from '../../../application/dtos/movimento/MovimentoOutputDTO';
import { SaldoDTO } from '../../../application/dtos/movimento/SaldoDTo';
import { AuthenticatedRequest } from '../../../types/express';

export class MovimentoController {
    public constructor(
        private readonly consultarSaldoUseCase: ConsultarSaldoUseCase,
        private readonly createMovimentoUseCase: CreateMovimentoUseCase,
        private readonly deleteMovimentoUseCase: DeleteMovimentoUseCase,
        private readonly listMovimentoUseCase: ListMovimentoUseCase,
        private readonly updateMovimentoUseCase: UpdateMovimentoUseCase
    ) {}

    consultarSaldo = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { userId } = req;
            const saldo = await this.consultarSaldoUseCase.execute(userId);
            res.status(200).json(ApiResponse.ok<SaldoDTO>(saldo, 'Saldo consultado com sucesso'));
        } catch (error) {
            next(error);
        }
    };

    listarMovimento = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { limit, skip, dataInicio, dataFim } = req.query;
            const { userId } = req;
            const parsedDataInicio = dataInicio ? new Date(dataInicio as string) : undefined;
            const parsedDataFim = dataFim ? new Date(dataFim as string) : undefined;

            const dto: ListInputDTO = {
                userId: userId,
                dataInicio: parsedDataInicio,
                dataLimite: parsedDataFim,
                limit: Number(limit) || 10,
                skip: Number(skip) || 0,
            };

            const listaMovimentos = await this.listMovimentoUseCase.execute(dto);
            res.status(200).json(
                ApiResponse.ok(listaMovimentos.lista, 'lista de movimentso obtida com sucesso', {
                    totalItems: listaMovimentos.total,
                    itemCount: listaMovimentos.lista.length,
                    itemsPerPage: dto.limit,
                    totalPages: Math.ceil(listaMovimentos.total / dto.limit),
                    currentPage: Math.floor(dto.skip / dto.limit) + 1,
                })
            );
        } catch (error) {
            next(error);
        }
    };

    criarMovimento = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { saldo, data, tipo } = req.body;
            const { userId } = req;
            const dto: CreateMovimentoDto = {
                userId: Number(userId),
                date: new Date(data as string),
                tipoMovimento: tipo,
                saldo: saldo,
            };
            const movimento = await this.createMovimentoUseCase.execute(dto);
            res.status(201).json(
                ApiResponse.ok<MovimentoOutputDTO>(movimento, 'Movimento criado com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };

    apagarMovimento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id, userId } = req.params;
            await this.deleteMovimentoUseCase.execute(Number(id), Number(userId));
            res.status(204).json(ApiResponse.ok<void>(null, 'Movimento apagado com sucesso'));
        } catch (error) {
            next(error);
        }
    };

    atualizarMovimento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id, userId } = req.params;
            const { saldo, tipo, data } = req.body;
            const dto: UpdateMovimentoDTO = {
                userId: Number(userId),
                id: Number(id),
                data: new Date(data as string),
                tipoMovimento: tipo,
                saldo: saldo,
            };
            const updated = await this.updateMovimentoUseCase.execute(dto);
            res.status(200).json(
                ApiResponse.ok<MovimentoOutputDTO>(updated, 'Movimento atualizado com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };
}
