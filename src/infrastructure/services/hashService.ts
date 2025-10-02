import bcrypt from 'bcrypt';
import { IHashService } from '../../application/services/hashService';

export class HashService implements IHashService {

    constructor (private readonly saltRounds: number) {}

    public async hash(data: string): Promise<string> {
        return bcrypt.hash(data, this.saltRounds);
    }
    
    public async compare(
        data: string, 
        hashed: string
    ): Promise<boolean> {
        return bcrypt.compare(data, hashed);
    }
}
