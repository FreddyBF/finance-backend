export enum TransactionTypeEnum {
    DESPESA = 'DESPESA',
    RECEITA = 'RECEITA',
}

class TransactionType {
    private readonly _type: TransactionTypeEnum;

    constructor(type: string) {
        if (!Object.values(TransactionTypeEnum).includes(type as TransactionTypeEnum)) {
            throw new Error(`Tipo de transaction inválido: ${type}`);
        }
        this._type = type as TransactionTypeEnum;
    }

    public isIncome(): boolean {
        return this._type === TransactionTypeEnum.RECEITA;
    }

    public isExpense(): boolean {
        return this._type === TransactionTypeEnum.DESPESA;
    }

    public getValue(): TransactionTypeEnum {
        return this._type;
    }
}

export { TransactionType };
