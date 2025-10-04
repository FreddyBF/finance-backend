export class UserNotFoundException extends Error {
    constructor(email: string) {
        super(`Não existe usuário com o email: ${email}`);
        this.name = 'UserNotFoundException';
    }
}
