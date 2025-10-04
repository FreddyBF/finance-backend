import { Request, Response, NextFunction } from 'express';
import { LoginUserUseCase } from '../../../application/usecases/user/LoginUserCase';
import { RegisterUserUseCase } from '../../../application/usecases/user/RegistarUsuarioUseCase';
import { CreateUserDTO } from '../../../application/dtos/user/CreateUserDto';
import { ApiResponse } from '../helper/apiResponse';
import { UserLoginDTO } from '../../../application/dtos/user/UserLoginDto';
import { AccessToken } from '../../../application/ports/TokenPort';

export class UserController {
    public constructor(
        private readonly loginUseCase: LoginUserUseCase,
        private readonly registerUserUseCase: RegisterUserUseCase
    ) {}

    userRegist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const dto: CreateUserDTO = {
                name: name,
                email: email,
                password: password,
            };
            await this.registerUserUseCase.execute(dto);
            res.status(201).json(ApiResponse.ok<void>(null, 'Usuário registrado com sucesso'));
        } catch (error) {
            next(error);
        }
    };

    userLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const dto: UserLoginDTO = {
                email: email,
                password: password,
            };
            const authToken = await this.loginUseCase.execute(dto);
            res.status(200).json(
                ApiResponse.ok<AccessToken>(authToken, 'Login realizado com sucesso')
            );
        } catch (error) {
            next(error);
        }
    };
}
