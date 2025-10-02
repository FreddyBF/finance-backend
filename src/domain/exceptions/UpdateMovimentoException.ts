export class UpdateMovimentoException extends Error {
    constructor(message?: string) {
        super(message ?? 'Pelo menos um campo deve ser informado para actualização');
        this.name = 'UpdateMovimentoException';
        Object.setPrototypeOf(this, UpdateMovimentoException.prototype); // necessário para instanceof
    }
}
