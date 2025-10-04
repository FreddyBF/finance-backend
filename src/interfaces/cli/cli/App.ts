import { CreateMovimentoDto } from '../../../application/dtos/transaction/CreateTransactionDto';
import { ListInputDTO } from '../../../application/dtos/transaction/ListTransactionInputDto';
import { UpdateMovimentoDTO } from '../../../application/dtos/transaction/UpdateTransactionDto';
import {
    createMovimentoUseCase,
    listMovimentoUseCase,
    updateMovimentoUseCase,
    consultarSaldoUseCase,
} from './composition';

import { CreateUsuarioDTO } from '../../../application/dtos/user/CreateUserDto';
import { LoginDTO } from '../../../application/dtos/user/UserLoginDto';
import { loginUsuarioUseCase, registerUsuarioUseCase } from './usuarioComposition';

(async () => {
    const mov: CreateMovimentoDto = {
        userId: 2,
        date: new Date('2025-08-12'), // 29 de setembro de 2025 (mês começa em 0)
        tipoMovimento: 'DESPESA',
        saldo: 1000,
    };

    const mov1: CreateMovimentoDto = {
        userId: 2,
        date: new Date('2025-08-29'), // 29 de setembro de 2025 (mês começa em 0)
        tipoMovimento: 'RECEITA',
        saldo: 5000,
    };

    const mov2: CreateMovimentoDto = {
        userId: 2,
        date: new Date('2025-08-10'), // 29 de setembro de 2025 (mês começa em 0)
        tipoMovimento: 'DESPESA',
        saldo: 200,
    };

    const mov3: CreateMovimentoDto = {
        userId: 2,
        date: new Date('2025-09-20'), // 29 de setembro de 2025 (mês começa em 0)
        tipoMovimento: 'DESPESA',
        saldo: 100,
    };

    const mov4: CreateMovimentoDto = {
        userId: 2,
        date: new Date('2025-09-12'), // 29 de setembro de 2025 (mês começa em 0)
        tipoMovimento: 'RECEITA',
        saldo: 10000,
    };

    try {
        const movimento = await createMovimentoUseCase.execute(mov);
        console.log(movimento);
        const u: UpdateMovimentoDTO = {
            userId: 1,
            id: 1,
            tipoMovimento: 'RECEITA',
            data: new Date('2025-08-20'),
        };
        const m = await updateMovimentoUseCase.execute(u);
        console.log(m);
        const movimento1 = await createMovimentoUseCase.execute(mov1);
        //console.log(movimento1);
        const movimento2 = await createMovimentoUseCase.execute(mov2);
        //console.log(movimento2);

        const movimento3 = await createMovimentoUseCase.execute(mov3);
        //console.log(movimento3);

        const movimento4 = await createMovimentoUseCase.execute(mov4);
        //console.log(movimento4);
        const saldo = await consultarSaldoUseCase.execute(1);
        console.log(`Saldo total: ${saldo}`);

        const data: ListInputDTO = {
            userId: 1,
            dataInicio: new Date('2024-08-12'),
            dataLimite: new Date('2025-09-20'),
        };

        const data1: ListInputDTO = {
            userId: 1,
            limit: 2,
            skip: 0,
        };
        const movimentos = await listMovimentoUseCase.execute(data);

        movimentos.lista.forEach((m) => console.log(m));
    } catch (error: any) {
        console.error(error.message);
    }
})();

(async () => {
    const user: CreateUsuarioDTO = {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        senha: 'securepassword',
    };

    const user1: CreateUsuarioDTO = {
        nome: 'Jane Smith',
        email: 'jane.smith@example.com',
        senha: 'anotherpassword',
    };

    try {
        await registerUsuarioUseCase.execute(user);
        await registerUsuarioUseCase.execute(user1);

        const login: LoginDTO = {
            email: 'jane.smith@example.com',
            senha: 'anotherpassword',
        };
        const t = await loginUsuarioUseCase.execute(login);
        console.log('JWT Token:', t);
    } catch (error: any) {
        console.error(error.message);
    }
})();
