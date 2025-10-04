import { UserInMemoryDatabase } from '../../../infrastructure/repositories/inMemory/inMemoryUserRepository';
import { RegisterUsuarioUseCase } from '../../../application/usecases/user/RegistarUsuarioUseCase';
import { LoginUsuarioUseCase } from '../../../application/usecases/user/LoginUserCase';
import { JwtService } from '../services/jwtService';
import { HashService } from '../../../infrastructure/adapters/security/hashService';
import { env } from '../../../config/env';

const usuarioRepository = new UserInMemoryDatabase();
const hashService = new HashService(env.SALT_ROUNDS);
const jwtService = new JwtService('secret', '1h');

const registerUsuarioUseCase = new RegisterUsuarioUseCase(usuarioRepository, hashService);
const loginUsuarioUseCase = new LoginUsuarioUseCase(usuarioRepository, hashService, jwtService);

export { registerUsuarioUseCase, loginUsuarioUseCase };
