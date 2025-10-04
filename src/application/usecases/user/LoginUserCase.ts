import { UserRepositoryPort } from '../../ports/UserRepositoryPort';
import { HashingPort } from '../../ports/HashingPort';
import { AccessToken, TokenPort } from '../../ports/TokenPort';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { InvalidPasswordException } from '../../exceptions/InvalidPasswordException';
import { UserLoginDTO } from '../../dtos/user/UserLoginDto';

export class LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryPort,
        private readonly hashingPort: HashingPort,
        private readonly tokenPort: TokenPort
    ) {}

    public async execute(input: UserLoginDTO): Promise<AccessToken> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new UserNotFoundException(input.email);
        }

        const isPasswordValid = await this.hashingPort.compare(input.password, user.password);

        if (!isPasswordValid) {
            throw new InvalidPasswordException();
        }

        return this.tokenPort.gerarToken({ id: user.id, email: user.email });
    }
}
