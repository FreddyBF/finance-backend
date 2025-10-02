import { UsuarioRepository } from '../../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../../domain/entities/usuario/Usuario';

export class UserInMemoryDatabase implements UsuarioRepository {
    private usuarios: Usuario[] = [];

    public save(usuario: Usuario): Promise<void> {
        const id = this.usuarios.length + 1;
        usuario = Usuario.create(id, usuario.nome, usuario.email, usuario.senha);
        console.log(`Usuário criado: ${JSON.stringify(usuario)}`);
        this.usuarios.push(usuario);
        return Promise.resolve();
    }

    public getAll(): Promise<Usuario[]> {
        return Promise.resolve(this.usuarios);
    }

    public findById(id: string): Promise<Usuario | null> {
        const usuario = this.usuarios.find((u) => u.id === Number(id));
        return Promise.resolve(usuario || null);
    }

    public findByEmail(email: string): Promise<Usuario | null> {
        const usuario = this.usuarios.find((u) => u.email === email);
        return Promise.resolve(usuario || null);
    }
}
