import { TransactionType } from './TransactionType';
import { Balance } from './Balance';

export class Transaction {
    private readonly _id: number | null;
    private readonly _userId: number;
    private readonly _date: Date;
    private readonly _type: TransactionType;
    private readonly _balance: Balance;

    private constructor(
        id: number | null,
        userId: number,
        date: Date,
        type: TransactionType,
        balance: Balance
    ) {
        this._id = id;
        this._userId = userId;
        this._date = date;
        this._type = type;
        this._balance = balance;
    }

    public static create(userId: number, date: Date, tipo: string, valor: number): Transaction {
        const type = new TransactionType(tipo);
        const balance = new Balance(valor);
        return new Transaction(null, userId, date, type, balance);
    }

    public static restore(
        id: number,
        userId: number,
        date: Date,
        tipo: string,
        valor: number
    ): Transaction {
        const type = new TransactionType(tipo);
        const balance = new Balance(valor);
        return new Transaction(id, userId, date, type, balance);
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

    public get balance(): number {
        return this._balance.apply(this._type);
    }

    public isExpense(): boolean {
        return this._type.isExpense();
    }

    public isIncome(): boolean {
        return this._type.isIncome();
    }
}
