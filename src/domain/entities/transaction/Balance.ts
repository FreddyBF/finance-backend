import { TransactionType } from './TransactionType';
import { InvalidBalanceException } from '../../exceptions/InvalidBalanceException';

class Balance {
    private readonly _value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new InvalidBalanceException(value);
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

export { Balance };
