// Infraestrutura
import { env } from './env';
import { InMemoryTransactionRepository } from '../infrastructure/repositories/inMemory/InMemoryTransactionRepository';
import { InMemoryUserRepository } from '../infrastructure/repositories/inMemory/inMemoryUserRepository';
import { JwtTokenAdapter } from '../infrastructure/adapters/auth/jwtService';
import { HashingAdapter } from '../infrastructure/adapters/security/hashService';

// Domínio
import { TransactionBalanceCalculator } from '../domain/services/TransactionBalanceCalculator';
// Casos de uso - Usuário
import { LoginUserUseCase } from '../application/usecases/user/LoginUserCase';
import { RegisterUserUseCase } from '../application/usecases/user/RegistarUsuarioUseCase';
// Casos de uso - Transações
import { CreateTransactionUseCase } from '../application/usecases/transaction/CreateTransactionUseCase';
import { GetBalanceUseCase } from '../application/usecases/transaction/GetBalanceUseCase';
import { GetTransactionsUseCase } from '../application/usecases/transaction/GetTransactionUseCase';
import { DeleteTransactionUseCase } from '../application/usecases/transaction/DeleteTransactionUseCase';
import { UpdateTransactionUseCase } from '../application/usecases/transaction/UpdateTransactionUseCase';

// Interfaces - Controllers
import { UserController } from '../interfaces/web/controllers/UserController';
import { TransactionController } from '../interfaces/web/controllers/TransactionController';

// Repositórios
const userRepository = new InMemoryUserRepository();
const transactionRepository = new InMemoryTransactionRepository();

// Serviços
const hashingAdapter = new HashingAdapter(env.SALT_ROUNDS);
const jwtService = new JwtTokenAdapter(env.ACCESS_SECRET, env.JWT_EXPIRATION);
const transactionBalanceCalculator = new TransactionBalanceCalculator();

// Casos de uso - Usuário
const loginUserUseCase = new LoginUserUseCase(userRepository, hashingAdapter, jwtService);
const registerUserUseCase = new RegisterUserUseCase(userRepository, hashingAdapter);

// Casos de uso - Transações
const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const getTransactionUseCase = new GetTransactionsUseCase(transactionRepository);
const consultarSaldoUseCase = new GetBalanceUseCase(
    transactionBalanceCalculator,
    transactionRepository
);
const updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository);
const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);

// Controllers
const userController = new UserController(loginUserUseCase, registerUserUseCase);

const transactionController = new TransactionController(
    consultarSaldoUseCase,
    createTransactionUseCase,
    deleteTransactionUseCase,
    getTransactionUseCase,
    updateTransactionUseCase
);

// Exportação
export { userController, transactionController, jwtService };
