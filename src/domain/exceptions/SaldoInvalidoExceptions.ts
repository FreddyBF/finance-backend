class SaldoInvalidoException extends Error {
    constructor(saldo: number) {
        super(`O saldo ${saldo} é inválido`);
    }
}

export { SaldoInvalidoException };
