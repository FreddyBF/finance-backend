# 💰 Kinvo Finance API

![Logo Kinvo](https://github.com/cbfranca/kinvo-front-end-test/blob/master/logo.svg)

API REST desenvolvida em Node.js com TypeScript para o desafio back-end da Kinvo. O objetivo é gerenciar movimentações financeiras (receitas e despesas), autenticar usuários e exibir o saldo, utilizando boas práticas de arquitetura limpa e código escalável.

---

## 📚 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Criação de movimentações (receitas e despesas)
- ✅ Atualização e exclusão de movimentações
- ✅ Listagem com filtros por data e paginação
- ✅ Exibição do saldo total

---

---
## 🛠️ Tecnologias utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
---

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git https://github.com/FreddyBF/finance-backend.git
cd finance-backend

# Instale as dependências
npm install

# Configure o banco de dados
# Crie um arquivo .env com as variáveis:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/kinvo"
JWT_SECRET="sua_chave_secreta"

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor
npm yarn dev
```
---

## 📮 Rotas principais

| Método | Rota                | Descrição                           |
|--------|---------------------|-------------------------------------|
| POST   | `/auth/register`    | Cadastro de usuário                 |
| POST   | `/auth/login`       | Login e geração de token JWT        |
| POST   | `/transactions`     | Criar movimentação                  |
| PUT    | `/transactions/:id` | Atualizar movimentação              |
| DELETE | `/transactions/:id` | Excluir movimentação                |
| GET    | `/transactions`     | Listar movimentações com filtros    |
| GET    | `/balance`          | Exibir saldo total                  |

⚠️ Todas as rotas de movimentações exigem autenticação via **token JWT**.

---

## 📌 Observações
- O projeto ainda **não possui testes automatizados** nem **Docker**.  
- A arquitetura foi pensada para **facilitar a escalabilidade e manutenção**.  
- Futuras melhorias incluem **testes**, **cache**, **segurança avançada** e **deploy**.  

---

## 🧠 Sobre o desafio
Este projeto foi desenvolvido como parte do **Desafio Back-end da Kinvo**.  
O foco está em aplicar **boas práticas de desenvolvimento**, **arquitetura limpa** e **organização de código**.
