export enum TipoMovimentoEnum {
    DESPESA = 'DESPESA',
    RECEITA = 'RECEITA',
}

class TipoMovimento {
    private readonly tipo: TipoMovimentoEnum;

    constructor(tipo: string) {
        if (!Object.values(TipoMovimentoEnum).includes(tipo as TipoMovimentoEnum)) {
            throw new Error(`Tipo de Movimento inválido: ${tipo}`);
        }
        this.tipo = tipo as TipoMovimentoEnum;
    }

    public isReceita(): boolean {
        return this.tipo === TipoMovimentoEnum.RECEITA;
    }

    public isDespesa(): boolean {
        return this.tipo === TipoMovimentoEnum.DESPESA;
    }

    public getValue(): TipoMovimentoEnum {
        return this.tipo;
    }
}

export { TipoMovimento };
