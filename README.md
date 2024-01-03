# Nestjs-kysely-automock
Projeto criado com o intuito de aprender a integrar o Kysely query builder com o NestJS e testar como o automock auxilia no desenvolvimento de testes de unidade mockando recursos provenientes de injeção de dependência.

## Stack
- [NestJS](https://nestjs.com)
- [Kysely](https://kysely.dev): Query Builder
- [Prisma](https://www.prisma.io): Schema Builder
- Postgres
- [Automock](https://automock.dev)

## Instalação e execução
```bash
# Clonar o projeto
git clone git@github.com:afmireski/nestjs-kysely-automock.git
# ou
git clone https://github.com/afmireski/nestjs-kysely-automock.git

# Acessar a pasta do projeto
cd nestjs-kysely-automock

# Instalar as depedências
yarn install

# Rodar as migrações
yarn prisma migrate dev

# Rodar o projeto
yarn start:dev

# Rodar os testes de unidade
yarn test
```

## Documentação
Foi utilizado o pacote `@nestjs/swagger` para gerar uma documentação que pode ser acessada em `/api`.
