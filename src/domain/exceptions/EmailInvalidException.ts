export class EmailInvalidoError extends Error {
    constructor(email?: string) {
        super(`Email inválido: ${email}`);
        this.name = 'EmailInvalidoError';
        Object.setPrototypeOf(this, EmailInvalidoError.prototype);
    }
}
