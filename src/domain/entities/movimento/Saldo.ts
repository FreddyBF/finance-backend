import { TipoMovimento } from './TipoMovimento';
import { SaldoInvalidoException } from '../../exceptions/SaldoInvalidoExceptions';

class Saldo {
    private readonly valor: number;

    constructor(valor: number) {
        if (valor <= 0) {
            throw new SaldoInvalidoException(valor);
        }
        this.valor = valor;
    }

    public aplicar(tipo: TipoMovimento): number {
        return tipo.isDespesa() ? this.valor * -1 : this.valor;
    }

    public getValor(): number {
        return this.valor;
    }
}

export { Saldo };
