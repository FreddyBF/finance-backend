import { User } from '../../../domain/entities/user/User';
import { CreateUserDTO } from '../../dtos/user/CreateUserDto';
import { EmailAlreadyExistsException } from '../../../domain/exceptions/EmailAlreadyExistsException';
import { HashingPort } from '../../ports/HashingPort';
import { UserRepositoryPort } from '../../ports/UserRepositoryPort';

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryPort,
        private readonly hashingPort: HashingPort
    ) {}

    public async execute(input: CreateUserDTO): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new EmailAlreadyExistsException(input.email);
        }
        const hashedPassword = await this.hashingPort.hash(input.password);
        const newUser = User.create(null, input.name, input.email, hashedPassword);

        await this.userRepository.save(newUser);
    }
}
