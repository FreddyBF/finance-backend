import { TransactionType } from './TransactionType';
import { Amount } from './Amount';

export class Transaction {
    private readonly _id: number | null;
    private readonly _userId: number;
    private readonly _date: Date;
    private readonly _type: TransactionType;
    private readonly _amount: Amount;

    private constructor(
        id: number | null,
        userId: number,
        date: Date,
        type: TransactionType,
        amount: Amount
    ) {
        this._id = id;
        this._userId = userId;
        this._date = date;
        this._type = type;
        this._amount = amount;
    }

    public static create(userId: number, date: Date, tipo: string, valor: number): Transaction {
        const type = new TransactionType(tipo);
        const amount = new Amount(valor);
        return new Transaction(null, userId, date, type, amount);
    }

    public static restore(
        id: number,
        userId: number,
        date: Date,
        tipo: string,
        valor: number
    ): Transaction {
        const type = new TransactionType(tipo);
        const amount = new Amount(valor);
        return new Transaction(id, userId, date, type, amount);
    }

    public get id(): number | null {
        return this._id;
    }

    public get userId(): number {
        return this._userId;
    }

    public get date(): Date {
        return this._date;
    }

    public get type(): string {
        return this._type.getValue();
    }

    public get amount(): number {
        return this._amount.apply(this._type);
    }

    public isExpense(): boolean {
        return this._type.isExpense();
    }

    public isIncome(): boolean {
        return this._type.isIncome();
    }
}
