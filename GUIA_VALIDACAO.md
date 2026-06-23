# 🧪 GUIA DE VALIDAÇÃO - Atividade MySQL

## ✅ Checklist de Requisitos Atendidos

### A. ✅ Conexão e Infraestrutura Relacional
- [x] Driver `mysql2` com suporte a Promises/async-await (instalado em `package.json`)
- [x] Variáveis de ambiente (.env) com credenciais do banco (DB_HOST, DB_USER, DB_PASS, DB_NAME)
- [x] Prepared Statements (?) em todas as queries SQL

### B. ✅ Rota Pública de Metadados
- [x] Endpoint público GET `/api/status` ✓
- [x] Endpoint público GET `/api/versao` ✓
- [x] Resposta JSON com versão e status

### C. ✅ Autenticação Adaptada
- [x] Login refatorado para MySQL (`authController.js`)
- [x] Verificação de credenciais na tabela `usuarios`
- [x] Geração de JWT com `id_usuario`

### D. ✅ CRUD com Restrição Estrita
- [x] CRUD completo para categorias (CREATE, READ, UPDATE, DELETE)
- [x] Middleware de autenticação validando token e `id-usuario`
- [x] Retorno 401 ou 403 sem credenciais válidas

---

## 🚀 PASSO-A-PASSO DE TESTES

### 1️⃣ INICIALIZAR O PROJETO

```bash
# Terminal 1: Verifique se o MySQL está rodando
# Se não estiver, inicie o MySQL

# Terminal 1: Importe o arquivo SQL
mysql -u root -p turma632 < loja.sql

# Terminal 2: Inicie a API
npm start
# Esperado: "Servidor rodando na porta 3000"
```

---

### 2️⃣ TESTE: Rota Pública de Status (SEM AUTENTICAÇÃO)

**Teste no Navegador ou Postman:**

```
GET http://localhost:3000/api/status
```

**Esperado:**
```json
{
  "versao": "2.0.0",
  "status": "online"
}
```

✅ **Se vir essa resposta, significa que a API está online e a rota pública funciona!**

---

### 3️⃣ TESTE: Bloqueio de Invasão (PROTEGIDO SEM TOKEN)

**Tente acessar CRUD SEM enviar credenciais:**

```
GET http://localhost:3000/api/categorias
```

**Esperado:**
```json
{
  "erro": "Token não fornecido"
}
```
Status: **401 Unauthorized** ✅

---

### 4️⃣ TESTE: Login e Obtenção de Token

**Faça login com o usuário padrão do banco:**

```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@loja.com",
  "senha": "turma632"
}
```

**Esperado:**
```json
{
  "mensagem": "Acesso permitido!",
  "token": "eyJhbGc...",
  "id_usuario": 1
}
```

**Anote o `token` e o `id_usuario`** - você vai precisar para os próximos testes!

---

### 5️⃣ TESTE: Bloqueio sem ID do Usuário

**Tente acessar categorias COM token, MAS SEM o header `x-user-id`:**

```bash
GET http://localhost:3000/api/categorias
Authorization: Bearer <SEU_TOKEN_AQUI>
```

**Esperado:**
```json
{
  "erro": "ID do usuario nao fornecido"
}
```
Status: **401 Unauthorized** ✅

---

### 6️⃣ TESTE: CRUD Completo COM Autenticação Correta

#### **A) Listar categorias (READ):**

```bash
GET http://localhost:3000/api/categorias
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
```

**Esperado:**
```json
[]
```
(Array vazio ou com categorias existentes)

---

#### **B) Criar categoria (CREATE):**

```bash
POST http://localhost:3000/api/categorias
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
Content-Type: application/json

{
  "nome": "Eletrônicos"
}
```

**Esperado:**
```json
{
  "id_categoria": 1,
  "nome": "Eletrônicos",
  "mensagem": "Categoria criada com sucesso"
}
```
Status: **201 Created** ✅

---

#### **C) Buscar categoria por ID (READ):**

```bash
GET http://localhost:3000/api/categorias/1
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
```

**Esperado:**
```json
{
  "id_categoria": 1,
  "nome": "Eletrônicos"
}
```

---

#### **D) Atualizar categoria (UPDATE):**

```bash
PUT http://localhost:3000/api/categorias/1
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
Content-Type: application/json

{
  "nome": "Eletrônicos e Acessórios"
}
```

**Esperado:**
```json
{
  "mensagem": "Categoria atualizada com sucesso"
}
```

---

#### **E) Deletar categoria (DELETE):**

```bash
DELETE http://localhost:3000/api/categorias/1
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
```

**Esperado:**
```json
{
  "mensagem": "Categoria removida com sucesso"
}
```

---

### 7️⃣ TESTE: Validação de Persistência no MySQL

**Verifique se os dados foram realmente gravados:**

```bash
# No terminal do MySQL
mysql -u root -p turma632
```

```sql
USE loja;
SELECT * FROM categorias;
```

**Esperado:** Você deve ver as categorias que criou e atualizou! ✅

---

### 8️⃣ TESTE: Proteção contra SQL Injection

**Tente enviar um comando SQL malicioso:**

```bash
POST http://localhost:3000/api/categorias
Authorization: Bearer <SEU_TOKEN_AQUI>
x-user-id: 1
Content-Type: application/json

{
  "nome": "Test'; DROP TABLE categorias; --"
}
```

**Esperado:** 
- A categoria é criada com o nome literal (sem executar DROP)
- Nenhum dano ao banco de dados ✅
- (Isso comprova que Prepared Statements estão funcionando!)

---

## 📋 DEMONSTRAÇÃO PARA O PROFESSOR

**Sequência recomendada:**

1. ✅ **Mostrar rota pública:** Abra `/api/status` no navegador
2. ✅ **Mostrar bloqueio de invasão:** Tente acessar `/api/categorias` sem token (erro 401)
3. ✅ **Mostrar fluxo completo:** 
   - Faça login e receba token
   - Use token + id-usuario para CRUD
   - Crie 2-3 categorias
   - Atualize uma
   - Delete uma
4. ✅ **Mostrar persistência:** Query no MySQL mostrando os dados no banco

---

## 🔒 Resumo de Segurança Implementada

| Requisito | Status | Onde está? |
|-----------|--------|-----------|
| Prepared Statements | ✅ Implementado | `src/models/*.js` - todas as queries usam `?` |
| Validação de Token | ✅ Implementado | `src/middleware/authMiddleware.js` |
| Validação de ID do Usuário | ✅ Implementado | `authMiddleware.js` - compara token com header |
| Credenciais em .env | ✅ Implementado | `.env` + `database.js` |
| Rotas públicas | ✅ Implementado | `/api/status`, `/api/versao` |
| CRUD protegido | ✅ Implementado | `categoriaRoutes.js` com middleware |

---

## 🎯 Critérios de Aceite

- [x] **Rota de Versão:** Acessível via navegador → `/api/status` ✅
- [x] **Bloqueio de Invasão:** Sem token/ID → erro 401/403 ✅
- [x] **Persistência Efetiva:** Dados gravados no MySQL ✅

**Seu projeto está 100% completo!** 🎉
