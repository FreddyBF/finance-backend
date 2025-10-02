export interface AuthPayload {
    id: number;
    email: string;
}

export interface AuthToken {
    token: string;
    exp: string; // data de expiração em formato ISO 8601
}

export interface ITokenService {
    gerarToken(payload: AuthPayload): AuthToken;
    verificarToken(token: string): AuthPayload;
}
