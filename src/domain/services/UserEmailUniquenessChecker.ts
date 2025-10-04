import { UserRepositoryPort } from '../../application/ports/UserRepositoryPort';
import { EmailAlreadyExistsException } from '../exceptions/EmailAlreadyExistsException';

export class UserEmailUniquenessChecker {
    constructor(private readonly userRepository: UserRepositoryPort) {}

    async ensureEmailIsUnique(email: string): Promise<void> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new EmailAlreadyExistsException(email);
        }
    }
}
