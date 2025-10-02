import { InMemoryDatabase } from '../database/inMemory/inMemory';
import { UsuarioController } from '../http/controllers/UsuarioController';
import { LoginUsuarioUseCase } from '../../application/usecases/usuario/LoginUsuarioUseCase';
import { RegisterUsuarioUseCase } from '../../application/usecases/usuario/RegistarUsuarioUseCase';
import { JwtService } from '../services/jwtService';
import { HashService } from '../services/hashService';
import { UserInMemoryDatabase } from '../database/inMemory/UsuarioInMemoryRepository';
import { MovimentoController } from '../http/controllers/MovimentoController';
import { CreateMovimentoUseCase } from '../../application/usecases/movimento/CreateMovimentoUseCase';
import { ListMovimentoUseCase } from '../../application/usecases/movimento/ListMovimentoUseCase';
import { ConsultarSaldoUseCase } from '../../application/usecases/movimento/ConsultarSaldoUseCase';
import { UpdateMovimentoUseCase } from '../../application/usecases/movimento/UpdateMovimentoUseCase';
import { DeleteMovimentoUseCase } from '../../application/usecases/movimento/DeleteMovimentoUseCase';
import { CalcularSaldoService } from '../../domain/services/CalcularSaldoService';
import { env } from './env';

const usuarioRepository = new UserInMemoryDatabase();
const hashService = new HashService(env.SALT_ROUNDS);

const jwtService = new JwtService(
    env.ACCESS_SECRET, 
    env.JWT_EXPIRATION
);

const loginUserCase = new LoginUsuarioUseCase(usuarioRepository, hashService, jwtService);
const registerUsuarioUseCase = new RegisterUsuarioUseCase(usuarioRepository, hashService);
const usuarioController = new UsuarioController(loginUserCase, registerUsuarioUseCase);

const movimentoRepository = new InMemoryDatabase();

const calcularSaldoService = new CalcularSaldoService();

const createMovimentoUseCase = new CreateMovimentoUseCase(movimentoRepository);

const listMovimentoUseCase = new ListMovimentoUseCase(movimentoRepository);

const consultarSaldoUseCase = new ConsultarSaldoUseCase(
    calcularSaldoService,
    movimentoRepository
);

const deleteMovimentoUseCase = new DeleteMovimentoUseCase(movimentoRepository);

const updateMovimentoUseCase = new UpdateMovimentoUseCase(movimentoRepository);

const movimentoController = new MovimentoController(
    consultarSaldoUseCase,
    createMovimentoUseCase,
    deleteMovimentoUseCase,
    listMovimentoUseCase,
    updateMovimentoUseCase
);

export { 
    usuarioController, 
    movimentoController, 
    jwtService 
};
