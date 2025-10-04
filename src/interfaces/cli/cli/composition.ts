import { InMemoryDatabase } from '../../../infrastructure/repositories/inMemory/InMemoryTransactionRepository';
import { CreateMovimentoUseCase } from '../../../application/usecases/transaction/CreateTransactionUseCase';
import { CalcularSaldoService } from '../../../domain/services/TransactionBalanceCalculator';
import { ListMovimentoUseCase } from '../../../application/usecases/transaction/GetTransactionUseCase';
import { UpdateMovimentoUseCase } from '../../../application/usecases/transaction/UpdateTransactionUseCase';
import { ConsultarSaldoUseCase } from '../../../application/usecases/transaction/GetBalanceUseCase';

// Instanciando dependências e injeção de dependências manualmente
const movimentoRepository = new InMemoryDatabase();
const createMovimentoUseCase = new CreateMovimentoUseCase(movimentoRepository);
const consultarSaldoUseCase = new ConsultarSaldoUseCase(
    new CalcularSaldoService(),
    movimentoRepository
);
const listMovimentoUseCase = new ListMovimentoUseCase(movimentoRepository);
const updateMovimentoUseCase = new UpdateMovimentoUseCase(movimentoRepository);

// Exportando as instâncias para serem usadas nos adaptadores de entrada
export {
    createMovimentoUseCase,
    consultarSaldoUseCase,
    listMovimentoUseCase,
    updateMovimentoUseCase,
};
