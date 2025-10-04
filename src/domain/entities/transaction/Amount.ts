import { TransactionType } from './TransactionType';
import { InvalidAmountException } from '../../exceptions/InvalidAmountException';

class Amount {
    private readonly _value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new InvalidAmountException(value);
        }
        this._value = value;
    }

    public apply(tipo: TransactionType): number {
        return tipo.isExpense() ? this.value * -1 : this.value;
    }

    public get value(): number {
        return this._value;
    }
}

export { Amount };
