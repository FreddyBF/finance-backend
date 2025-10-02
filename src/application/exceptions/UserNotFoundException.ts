export class UserNotFoundException extends Error {
    constructor(email: string) {
        super(`Usuario não encontrado com o email: ${email}`);
        this.name = 'UserNotFoundError';
    }
}
