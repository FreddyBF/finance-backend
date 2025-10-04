import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../../domain/entities/user/User';

export class InMemoryUserRepository implements UserRepositoryPort {
    private users: User[] = [];

    public async save(user: User): Promise<void> {
        const id = this.users.length + 1;
        const newUser = User.create(id, user.name, user.email, user.password);
        this.users.push(newUser);
    }

    public async getAll(): Promise<User[]> {
        return this.users;
    }

    public async findById(id: number): Promise<User | null> {
        const user = this.users.find((u) => u.id === id);
        return user || null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find((u) => u.email === email);
        return user || null;
    }
}
