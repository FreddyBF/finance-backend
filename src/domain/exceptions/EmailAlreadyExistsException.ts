export class EmailAlreadyExistsException extends Error {
    constructor(email?: string) {
        super(`O email ${email ?? '[unknown]'} já esta em uso.`);
        this.name = 'EmailAlreadyExistsException';
    }
}
