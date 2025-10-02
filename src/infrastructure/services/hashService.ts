import bcrypt from 'bcrypt';
import { IHashService } from '../../application/services/hashService';

export class HashService implements IHashService {
    private readonly saltRounds = 10;

    public async hash(data: string): Promise<string> {
        return bcrypt.hash(data, this.saltRounds);
    }

    public async compare(data: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(data, hashed);
    }
}
