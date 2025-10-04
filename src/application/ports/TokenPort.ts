export interface TokenPayload {
    id: number;
    email: string;
}

export interface AccessToken {
    token: string;
    exp: string; // data de expiração em formato ISO 8601
}

export interface TokenPort {
    gerarToken(payload: TokenPayload): AccessToken;
    verificarToken(token: string): TokenPayload;
}
