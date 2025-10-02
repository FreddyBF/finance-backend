import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';
import { UpdateMovimentoDTO, validateUpdate } from '../../dtos/movimento/UpdateMovimentoDTO';
import { Movimento } from '../../../domain/entities/movimento/Movimento';
import { NotFoundMovimentoException } from '../../../domain/exceptions/NotFoundException';
import { MovimentoOutputDTO } from '../../dtos/movimento/MovimentoOutputDTO';
import { MovimentoMapper } from '../../mappers/MovimentoMapper';

export class UpdateMovimentoUseCase {
    constructor(private readonly movimentoRepository: MovimentoRepository) {}

    async execute(dto: UpdateMovimentoDTO): Promise<MovimentoOutputDTO> {
        // valida DTO
        validateUpdate(dto);
        // busca movimento existente
        const movimentoExistente = await this.movimentoRepository.findById(dto.id, dto.userId);

        if (!movimentoExistente) {
            throw new NotFoundMovimentoException();
        }

        // cria nova entidade combinando campos existentes com os atualizados
        let movimentoAtualizado = Movimento.restore(
            dto.userId,
            dto.id,
            dto.data ?? movimentoExistente.data,
            dto.tipoMovimento ?? movimentoExistente.tipoMovimento,
            dto.saldo ?? Math.abs(movimentoExistente.saldo) // pega valor absoluto, o getter já aplica negativo se for despesa
        );
        // persiste a nova entidade
        movimentoAtualizado = await this.movimentoRepository.update(movimentoAtualizado);
        return MovimentoMapper.entityToDto(movimentoAtualizado);
    }
}
