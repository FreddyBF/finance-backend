class TipoMovimentoInvalidoException extends Error {
    constructor(tipoRecebido: string) {
        super(`Tipo de movimento inválido: "${tipoRecebido}". Esperado "RECEITA" ou "DESPESA".`);
        this.name = 'TipoMovimentoInvalidoException';
    }
}

export { TipoMovimentoInvalidoException };
