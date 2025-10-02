import { Movimento } from '../entities/movimento/Movimento';

export class CalcularSaldoService {
    execute(listaMovimentos: Movimento[]): number {
        const saldoTotal = listaMovimentos.reduce((acc, mov) => acc + mov.saldo, 0);
        return saldoTotal;
    }
}
