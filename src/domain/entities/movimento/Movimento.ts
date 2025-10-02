import { TipoMovimento } from './TipoMovimento';
import { Saldo } from './Saldo';

class Movimento {
    private readonly _id: number | null;
    private readonly _userId: number;
    private readonly _data: Date;
    private readonly _tipoMovimento: TipoMovimento;
    private readonly _saldo: Saldo;

    private constructor(
        id: number | null,
        userId: number,
        data: Date,
        tipoMovimento: TipoMovimento,
        saldo: Saldo
    ) {
        this._id = id;
        this._userId = userId;
        this._data = data;
        this._tipoMovimento = tipoMovimento;
        this._saldo = saldo;
    }

    public static create(userId: number, data: Date, tipo: string, valor: number): Movimento {
        const tipoMovimento = new TipoMovimento(tipo);
        const saldo = new Saldo(valor);
        return new Movimento(null, userId, data, tipoMovimento, saldo);
    }

    public static restore(
        id: number,
        userId: number,
        data: Date,
        tipo: string,
        valor: number
    ): Movimento {
        const tipoMovimento = new TipoMovimento(tipo);
        const saldo = new Saldo(valor);
        return new Movimento(id, userId, data, tipoMovimento, saldo);
    }

    public get id(): number | null {
        return this._id;
    }

    public get userId(): number {
        return this._userId;
    }

    public get data(): Date {
        return this._data;
    }

    public get tipoMovimento(): string {
        return this._tipoMovimento.getValue();
    }

    public get saldo(): number {
        return this._saldo.aplicar(this._tipoMovimento);
    }

    public isDespesa(): boolean {
        return this._tipoMovimento.isDespesa();
    }

    public isReceita(): boolean {
        return this._tipoMovimento.isReceita();
    }
}

export { Movimento };
