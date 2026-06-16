# API Loja

API REST desenvolvida com Node.js, Express e MySQL para autenticação de usuários e CRUD protegido de categorias.

## Tecnologias

- Node.js
- Express
- MySQL com mysql2/promise
- BCryptjs
- JSON Web Token (JWT)
- Dotenv

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Execute o script `loja.sql` no MySQL Workbench ou MySQL command line.

3. Crie/preencha o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_do_mysql
DB_NAME=loja
JWT_SECRET=sua_chave_secreta
```

4. Inicie o servidor:

```bash
node app.js
```

## Endpoints publicos

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /api/status | Retorna status e versao da API |
| GET | /api/versao | Retorna status e versao da API |
| POST | /auth/registrar | Registra um usuario no MySQL |
| POST | /auth/login | Realiza login e retorna token |

## Categorias

As rotas abaixo exigem dois headers:

```http
Authorization: Bearer SEU_TOKEN
x-user-id: ID_DO_USUARIO
```

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /api/categorias | Lista categorias |
| GET | /api/categorias/:id | Busca uma categoria |
| POST | /api/categorias | Cria uma categoria |
| PUT | /api/categorias/:id | Atualiza uma categoria |
| DELETE | /api/categorias/:id | Remove uma categoria |

Exemplo de body para criar ou atualizar categoria:

```json
{
  "nome": "Bebidas"
}
```

## Segurança

- Credenciais isoladas no `.env`
- Queries SQL com Prepared Statements (`?`)
- Senhas criptografadas com BCrypt
- Autenticacao via JWT
- CRUD de categorias bloqueado sem token valido e ID do usuario
