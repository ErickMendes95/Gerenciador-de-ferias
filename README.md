# Gerenciador de Férias

Este é um projeto fullstack desenvolvido com Next.js e Node.js

## Rodando o Projeto Localmente

### Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Você também precisa ter um banco de dados PostgreSQL configurado.

### Baixando e Abrindo o Projeto

1. Clone este repositório para o seu computador usando o Git ou baixe o arquivo ZIP.
2. Descompacte o arquivo ZIP, se necessário.
3. Abra a pasta do projeto em um editor de código, como o Visual Studio Code (VSCode).

### Backend

1. No terminal, navegue até a pasta do backend: `cd backend`.
2. Instale as dependências: `npm install`.
3. Crie um arquivo `.env` com as configurações do banco de dados. Você pode usar o arquivo `.env.example` como base e substituir as variáveis de ambiente de acordo com sua configuração. Aqui estão duas opções:
   - **Usando Banco de Dados na Nuvem (ElephantSQL)**:
     ```
     DATABASE_URL=postgres://dvvhriqk:gaEN-44PHaEEROnDHBPwzdBgLGDq9aDM@bubble.db.elephantsql.com/dvvhriqk
     ```
   - **Configuração Padrão (Banco Local)**:
     ```
     POSTGRES_USERNAME=postgres
     POSTGRES_PASSWORD=root
     POSTGRES_HOST=localhost
     POSTGRES_PORT=5432
     POSTGRES_DATABASE=gerenciador_de_ferias

     DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
     ```
4. Inicie o servidor backend: `npm run dev`.

### Frontend

1. No terminal, navegue até a pasta do frontend: `cd frontend`.
2. Instale as dependências: `npm install`.
3. Inicie o servidor frontend: `npm run dev`.

Agora, tanto o servidor backend quanto o frontend estão rodando localmente.
