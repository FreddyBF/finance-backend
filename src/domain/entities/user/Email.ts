import { InvalidEmailException } from '../../exceptions/InvalidEmailException';

export class Email {
    private readonly _email: string;

    constructor(email: string) {
        if (!email || !this.isValidEmail(email)) {
            throw new InvalidEmailException();
        }
        this._email = email;
    }

    public getValor(): string {
        return this._email;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
