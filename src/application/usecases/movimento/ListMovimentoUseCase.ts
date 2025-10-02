import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';
import { ListInputDTO } from '../../dtos/movimento/ListInputDTO';
import { ListMovimentoOutpuDTO } from '../../dtos/movimento/ListMovimentoOutputDTO';
import { MovimentoMapper } from '../../mappers/MovimentoMapper';

export class ListMovimentoUseCase {
    private readonly _movimentoRepository: MovimentoRepository;

    constructor(movimentoRepository: MovimentoRepository) {
        this._movimentoRepository = movimentoRepository;
    }
    async execute(input: ListInputDTO): Promise<ListMovimentoOutpuDTO> {
        const list = await this._movimentoRepository.getAll(
            input.userId,
            input.limit,
            input.skip,
            input.dataInicio,
            input.dataLimite
        );
        return MovimentoMapper.entityToListDto(
            list //input.dataInicio, input.dataLimite
        );
    }
}
