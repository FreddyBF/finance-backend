import { EmailInvalidoError } from '../../exceptions/EmailInvalidException';

export class Email {
    private readonly _email: string;

    constructor(email: string) {
        if (!email || !this.isValidEmail(email)) {
            throw new EmailInvalidoError();
        }
        this._email = email;
    }

    public getValor(): string {
        return this._email;
    }

    private isValidEmail(email: string): boolean {
        //simples regex para validação de email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
