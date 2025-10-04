import { User } from '../../domain/entities/user/User';

export interface UserRepositoryPort {
    save(User: User): Promise<void>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
