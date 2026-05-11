# Catálogo de Produtos API

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de um catálogo de produtos com autenticação de usuários.

## Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- BCryptjs
- JSON Web Token (JWT)

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente

### Instalação

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/catalogo-api
cd catalogo-api
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Crie o arquivo `.env` baseado no `.env.example`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Preencha as variáveis no `.env`:
\`\`\`
PORT=3000
MONGODB_URI=mongodb://localhost:27017/catalogo-api
JWT_SECRET=sua_chave_secreta
\`\`\`

5. Inicie o servidor:
\`\`\`bash
node app.js
\`\`\`

## Endpoints

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/registrar | Registra um novo usuário |
| POST | /auth/login | Realiza login e retorna o token |

### Produtos (requer token)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Lista todos os produtos |
| GET | /produtos/:id | Busca um produto por ID |
| POST | /produtos | Cria um novo produto |
| PUT | /produtos/:id | Atualiza um produto |
| DELETE | /produtos/:id | Remove um produto |

## Autenticação

As rotas de produtos são protegidas. Após o login, use o token retornado no header:

\`\`\`
Authorization: Bearer SEU_TOKEN_AQUI
\`\`\`

## Segurança

- Senhas criptografadas com BCrypt
- Autenticação via JWT
- Proteção contra NoSQL Injection via sanitizeFilter do Mongoose