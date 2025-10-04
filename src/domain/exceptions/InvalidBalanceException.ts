export class InvalidBalanceException extends Error {
    constructor(balance: number) {
        super(`O saldo ${balance} é inválido`);
        this.name = 'InvalidBalanceException';
    }
}
