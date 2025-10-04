import { Email } from './Email';

export class User {
    private readonly _id: number | null;
    private readonly _name: string;
    private readonly _email: Email;
    private readonly _password: string;

    private constructor(id: number, name: string, email: string, password: string) {
        this._id = id;
        this._name = name;
        this._email = new Email(email);
        this._password = password;
    }

    public static create(id: number, name: string, email: string, password: string): User {
        return new User(id, name, email, password);
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email.getValor();
    }

    public get password(): string {
        return this._password;
    }
}
