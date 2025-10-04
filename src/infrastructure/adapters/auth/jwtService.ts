import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { TokenPayload, TokenPort, AccessToken } from '../../../application/ports/TokenPort';
import { UnauthorizedException } from '../../../application/exceptions/UnauthorizedException';

export class JwtTokenAdapter implements TokenPort {
    constructor(
        private readonly secret: Secret,
        private readonly expiresIn: string
    ) {}

    public gerarToken(payload: TokenPayload): AccessToken {
        const token = jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn as SignOptions['expiresIn'],
        });

        const decoded = jwt.decode(token) as { exp: number } | null;
        if (!decoded || !decoded.exp) {
            throw new Error('Erro ao gerar token: exp ausente');
        }

        return {
            token,
            exp: new Date(decoded.exp * 1000).toISOString(),
        };
    }

    public verificarToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, this.secret) as TokenPayload;
        } catch {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}
