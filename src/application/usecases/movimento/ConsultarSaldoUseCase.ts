import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';
import { CalcularSaldoService } from '../../../domain/services/CalcularSaldoService';
import { SaldoDTO } from '../../dtos/movimento/SaldoDTo';

export class ConsultarSaldoUseCase {
    constructor(
        private readonly calcularSaldoService: CalcularSaldoService,
        private readonly movimentoRepository: MovimentoRepository
    ) {}

    async execute(userId: number): Promise<SaldoDTO> {
        console.log(`Use case- ${userId}`);
        const listaMovimentos = await this.movimentoRepository.getAll(userId);
        const saldo = await this.calcularSaldoService.execute(listaMovimentos);
        return {
            data: new Date(),
            saldo: saldo,
        };
    }
}
