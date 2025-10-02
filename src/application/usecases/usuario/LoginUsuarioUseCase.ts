import { UsuarioRepository } from '../../../domain/repositories/UsuarioRepository';
import { IHashService } from '../../services/hashService';
import { AuthToken, ITokenService } from '../../services/authService';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { SenhaIncorretaException } from '../../exceptions/SenhaIncorretaException';
import { LoginDTO } from '../../dtos/usuario/LoginDTO';

export class LoginUsuarioUseCase {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly hashService: IHashService,
        private readonly itokenService: ITokenService
    ) {}
    public async execute(input: LoginDTO): Promise<AuthToken> {
        const usuario = await this.usuarioRepository.findByEmail(input.email);
        if (!usuario) {
            throw new UserNotFoundException(input.email);
        }

        const senhaValida = await this.hashService.compare(input.senha, usuario.senha);
        if (!senhaValida) {
            throw new SenhaIncorretaException();
        }
        return this.itokenService.gerarToken({ id: usuario.id, email: usuario.email });
    }
}
