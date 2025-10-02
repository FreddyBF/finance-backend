import { Movimento } from '../../../domain/entities/movimento/Movimento';
import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';
import { CreateMovimentoDto } from '../../dtos/movimento/CreateMovimentoDTO';
import { MovimentoMapper } from '../../mappers/MovimentoMapper';
import { MovimentoOutputDTO } from '../../dtos/movimento/MovimentoOutputDTO';

class CreateMovimentoUseCase {
    constructor(private readonly movimentoRepository: MovimentoRepository) {}

    async execute(input: CreateMovimentoDto): Promise<MovimentoOutputDTO> {
        const movimento = Movimento.create(
            input.userId,
            input.date,
            input.tipoMovimento,
            input.saldo
        );

        const saved = await this.movimentoRepository.save(movimento);
        return MovimentoMapper.entityToDto(saved);
    }
}

export { CreateMovimentoUseCase };
