export class SenhaIncorretaException extends Error {
    constructor() {
        super(`Senha incorreta.`);
        this.name = 'SenhaIncorretaError';
    }
}
