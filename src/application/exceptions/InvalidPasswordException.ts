export class InvalidPasswordException extends Error {
    constructor() {
        super(`Palavra-passe incorreta.`);
        this.name = 'InvalidPasswordException';
    }
}
