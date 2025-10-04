export class InvalidAmountException extends Error {
    constructor(amount: number) {
        super(`O saldo ${amount} é inválido`);
        this.name = 'InvalidAmountException';
    }
}
