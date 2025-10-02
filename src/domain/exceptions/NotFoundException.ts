export class NotFoundMovimentoException extends Error {
    constructor(message?: string) {
        super(message ?? 'Movimento não encontrado');
        this.name = 'NotFoundMovimentoException';
        Object.setPrototypeOf(this, NotFoundMovimentoException.prototype); // necessário para instanceof
    }
}
