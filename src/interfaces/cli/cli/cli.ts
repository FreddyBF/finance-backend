import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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

const rl = readline.createInterface({ input, output });

async function main() {
    console.log('Bem-vindo ao sistema de finanças pessoais');

    while (true) {
        console.log('\nEscolha uma opção:');
        console.log('1 - Registrar usuário');
        console.log('2 - Login');
        console.log('3 - Criar movimento');
        console.log('4 - Atualizar movimento');
        console.log('5 - Consultar saldo');
        console.log('6 - Listar movimentos');
        console.log('0 - Sair');

        const choice = await rl.question('> ');

        try {
            switch (choice) {
                case '1': {
                    const nome = await rl.question('Nome: ');
                    const email = await rl.question('Email: ');
                    const senha = await rl.question('Senha: ');

                    const user: CreateUsuarioDTO = { nome, email, senha };
                    await registerUsuarioUseCase.execute(user);
                    console.log('Usuário registrado com sucesso!');
                    break;
                }

                case '2': {
                    const email = await rl.question('Email: ');
                    const senha = await rl.question('Senha: ');

                    const login: LoginDTO = { email, senha };
                    const token = await loginUsuarioUseCase.execute(login);
                    console.log('JWT Token:', token);
                    break;
                }

                case '3': {
                    const tipo = await rl.question('Tipo (RECEITA/DESPESA): ');
                    const saldo = parseFloat(await rl.question('Valor: '));
                    const data = new Date(await rl.question('Data (YYYY-MM-DD): '));

                    const mov: CreateMovimentoDto = {
                        userId: 1,
                        tipoMovimento: tipo,
                        saldo,
                        date: data,
                    };
                    const resultado = await createMovimentoUseCase.execute(mov);
                    console.log('Movimento criado:', resultado);
                    break;
                }

                case '4': {
                    const id = parseInt(await rl.question('ID do movimento: '));
                    const tipo = await rl.question('Novo tipo (RECEITA/DESPESA): ');
                    const data = new Date(await rl.question('Nova data (YYYY-MM-DD): '));

                    const update: UpdateMovimentoDTO = { userId: 1, id, tipoMovimento: tipo, data };
                    const resultado = await updateMovimentoUseCase.execute(update);
                    console.log('Movimento atualizado:', resultado);
                    break;
                }

                case '5': {
                    const saldo = await consultarSaldoUseCase.execute(1);
                    console.log(`Saldo total: ${saldo.saldo}`);
                    break;
                }

                case '6': {
                    const dataInicio = new Date(await rl.question('Data início (YYYY-MM-DD): '));
                    const dataLimite = new Date(await rl.question('Data fim (YYYY-MM-DD): '));

                    const filtro: ListInputDTO = { userId: 1, dataInicio, dataLimite };
                    const movimentos = await listMovimentoUseCase.execute(filtro);
                    movimentos.lista.forEach((m) => console.log(m));
                    break;
                }

                case '0': {
                    console.log('Saindo...');
                    rl.close();
                    process.exit(0);
                }

                default:
                    console.log('Opção inválida');
            }
        } catch (error: any) {
            console.error('Erro:', error.message);
        }
    }
}

main();
