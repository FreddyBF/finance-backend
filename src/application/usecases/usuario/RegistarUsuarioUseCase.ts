import { Usuario } from '../../../domain/entities/usuario/Usuario';
import { UsuarioRepository } from '../../../domain/repositories/UsuarioRepository';
import { CreateUsuarioDTO } from '../../dtos/usuario/CreateUsuarioDTO';
import { EmailAlRedyExistException } from '../../exceptions/EmailAlRedyExistException';
import { IHashService } from '../../services/hashService';

export class RegisterUsuarioUseCase {
    public constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly hashService: IHashService
    ) {}
    public async execute(input: CreateUsuarioDTO): Promise<void> {
        const usuario = await this.usuarioRepository.findByEmail(input.email);
        if (usuario) {
            throw new EmailAlRedyExistException(input.email);
        }
        const senhaHash = await this.hashService.hash(input.senha);
        const novoUsuario = Usuario.create(null, input.nome, input.email, senhaHash);
        await this.usuarioRepository.save(novoUsuario);
    }
}
