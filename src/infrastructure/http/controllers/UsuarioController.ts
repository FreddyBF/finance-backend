import { CreateUsuarioDTO } from '../../../application/dtos/usuario/CreateUsuarioDTO';
import { LoginDTO } from '../../../application/dtos/usuario/LoginDTO';
import { LoginUsuarioUseCase } from '../../../application/usecases/usuario/LoginUsuarioUseCase';
import { RegisterUsuarioUseCase } from '../../../application/usecases/usuario/RegistarUsuarioUseCase';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../helper/apiResponse';
import { AuthToken } from '../../../application/services/authService';

export class UsuarioController {
    public constructor(
        private readonly loginUseCase: LoginUsuarioUseCase,
        private readonly registerUsuarioUseCase: RegisterUsuarioUseCase
    ) {}

    registarUsuario = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Request de criaçao');
        try {
            const { nome, email, senha } = req.body;
            const dto: CreateUsuarioDTO = {
                nome: nome,
                email: email,
                senha: senha,
            };
            await this.registerUsuarioUseCase.execute(dto);
            res.status(200).json(ApiResponse.ok<void>(null, 'Usuário registrado com sucesso'));
        } catch (error) {
            next(error);
        }
    };

    userLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, senha } = req.body;
            const dto: LoginDTO = {
                email: email,
                senha: senha,
            };
            const authToken = await this.loginUseCase.execute(dto);
            res.status(200).json(
                ApiResponse.ok<AuthToken>(authToken, 'Login realizado com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };
}
