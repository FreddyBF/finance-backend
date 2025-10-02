import { Email } from './Email';

export class Usuario {
    private readonly _id: number | null;
    private readonly _nome: string;
    private readonly _email: Email;
    private readonly _senha: string;

    public constructor(id: number, nome: string, email: string, senha: string) {
        this._id = id;
        this._nome = nome;
        this._email = new Email(email);
        this._senha = senha;
    }

    public static create(id: number, nome: string, email: string, senha: string): Usuario {
        return new Usuario(id, nome, email, senha);
    }

    public get id(): number {
        return this._id;
    }

    public get nome(): string {
        return this._nome;
    }
    public get email(): string {
        return this._email.getValor();
    }

    public get senha(): string {
        return this._senha;
    }
}
