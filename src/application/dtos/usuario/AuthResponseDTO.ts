export interface AuthResponseDTO {
    token: string;
    tipoToken: 'Bearer';
    expiracao: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
}
