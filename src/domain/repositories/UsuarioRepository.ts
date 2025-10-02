import { Usuario } from '../entities/usuario/Usuario';

export interface UsuarioRepository {
    save(usuario: Usuario): Promise<void>;
    findById(id: string): Promise<Usuario | null>;
    findByEmail(email: string): Promise<Usuario | null>;
}
