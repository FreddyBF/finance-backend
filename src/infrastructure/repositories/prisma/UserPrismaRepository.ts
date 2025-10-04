import { PrismaClient } from '@prisma/client';
import { UserRepositoryPort } from '../../../application/ports/UserRepositoryPort';
import { User } from '../../../domain/entities/user/User';

export class PrismaUserRepository implements UserRepositoryPort {
    private constructor(private readonly prisma: PrismaClient) {}

    public static create(prisma: PrismaClient): PrismaUserRepository {
        return new PrismaUserRepository(prisma);
    }

    public async save(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }

    public async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? User.create(user.id, user.name, user.email, user.password) : null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? User.create(user.id, user.name, user.email, user.password) : null;
    }
}
