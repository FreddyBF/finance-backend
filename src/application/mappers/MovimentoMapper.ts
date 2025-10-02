import { Movimento } from '../../domain/entities/movimento/Movimento';
import { ListMovimentoOutpuDTO } from '../dtos/movimento/ListMovimentoOutputDTO';
import { MovimentoOutputDTO } from '../dtos/movimento/MovimentoOutputDTO';

export class MovimentoMapper {
    public static entityToDto(movimento: Movimento): MovimentoOutputDTO {
        return {
            id: movimento.id,
            tipo: movimento.tipoMovimento.toLowerCase(),
            saldo: movimento.saldo,
            data: movimento.data,
        };
    }
    public static entityToListDto(
        movimentos: Movimento[],
        dataInicio?: Date,
        dataFim?: Date
    ): ListMovimentoOutpuDTO {
        return {
            lista: movimentos.map((m) => MovimentoMapper.entityToDto(m)),
        };
    }
}
