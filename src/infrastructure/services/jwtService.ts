import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { ITokenService, AuthPayload, AuthToken } from '../../application/services/authService';
import { UnauthorizedException } from '../../application/exceptions/UnauthorizedException';

export class JwtService implements ITokenService {
    constructor(
        private readonly secret: Secret,
        private readonly expiresIn: string
    ) {}

    public gerarToken(payload: AuthPayload): AuthToken {
        const token = jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn as SignOptions['expiresIn'],
        });

        const { exp } = jwt.decode(token) as { exp: number };
        return { token, exp: new Date(exp * 1000).toISOString() };
    }

    public verificarToken(token: string): AuthPayload {
        try {
            return jwt.verify(token, this.secret) as AuthPayload;
        } catch {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}
