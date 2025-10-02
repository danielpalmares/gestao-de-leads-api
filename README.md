# 🚀 Gestão de Leads API

API RESTful para gerenciamento de leads desenvolvida com Node.js, TypeScript, Express, Prisma e PostgreSQL. Inclui autenticação JWT, filtros avançados, paginação e validação robusta.

## 📑 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Configuração do Ambiente](#️-configuração-do-ambiente)
- [Scripts Disponíveis](#️-scripts-disponíveis)
- [Documentação da API](#-documentação-da-api)
  - [Autenticação](#-autenticação)
  - [Endpoints](#-endpoints)
  - [Códigos de Erro](#-códigos-de-erro-comuns)
  - [Exemplos com cURL](#-exemplos-com-curl)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Docker](#-docker)
- [Prisma Studio](#-prisma-studio)
- [Arquitetura e Tecnologias](#️-arquitetura-e-tecnologias)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Configuração do Ambiente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário.

### 3. Configurar banco de dados

```bash
# Iniciar PostgreSQL com Docker
npm run db:up

# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# Popular banco com dados de exemplo (opcional)
npm run db:seed
```

### 4. Iniciar aplicação

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 🗃️ Scripts Disponíveis

| Script                | Descrição                                |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Inicia aplicação em modo desenvolvimento |
| `npm run db:up`       | Inicia container PostgreSQL              |
| `npm run db:down`     | Para container PostgreSQL                |
| `npm run db:reset`    | Reinicia container PostgreSQL            |
| `npm run db:migrate`  | Executa migrações do banco               |
| `npm run db:studio`   | Abre Prisma Studio                       |
| `npm run db:generate` | Gera cliente Prisma                      |
| `npm run db:seed`     | Popula banco com dados de exemplo        |

## 📊 Prisma Studio

Para visualizar e gerenciar dados do banco:

```bash
npm run db:studio
```

## 🐳 Docker

### Configuração do PostgreSQL

O banco PostgreSQL roda em container Docker e usa as credenciais definidas no arquivo `.env`:

- **Porta:** Definida por `POSTGRES_PORT` (padrão: 5432)
- **Database:** Definido por `POSTGRES_DB` (padrão: leads_db)
- **Usuário:** Definido por `POSTGRES_USER` (padrão: leads_user)
- **Senha:** Definida por `POSTGRES_PASSWORD` (padrão: leads_password)

### Comandos Docker úteis

```bash
# Ver logs do PostgreSQL
docker-compose logs postgres

# Acessar container PostgreSQL (usando variáveis do .env)
docker-compose exec postgres psql -U $POSTGRES_USER -d $POSTGRES_DB
```

## 🏗️ Arquitetura

```
src/
├── cases/
│   └── Lead/
│       ├── create/
│       ├── read/
│       ├── update/
│       └── delete/
├── data/
│   ├── database/
│   └── repositories/
├── domain/
│   └── entities/
└── utils/
```

## 📝 Documentação da API

### 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Para acessar rotas protegidas, você deve:

1. Fazer login em `/auth/login`
2. Usar o token retornado no header `Authorization: Bearer <token>`

#### Credenciais padrão:

- **Username:** `admin`
- **Password:** `admin123`

### 🌐 Endpoints

#### 🔓 Rotas Públicas

##### POST /auth/login

Autenticar usuário e obter token JWT.

**Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**

```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

**Errors:**

- `400` - Username/password não fornecidos
- `401` - Credenciais inválidas

---

##### POST /leads

Criar um novo lead.

**Request:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone_number": "11999999999",
  "role": "Desenvolvedor",
  "birth_date": "1990-05-15",
  "message": "Interessado em oportunidades"
}
```

**Response (201):**

```json
{
  "result": {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone_number": "11999999999",
    "role": "Desenvolvedor",
    "birth_date": "1990-05-15T00:00:00.000Z",
    "message": "Interessado em oportunidades"
  },
  "status": 201
}
```

**Validações:**

- `name`: mínimo 3 caracteres
- `email`: formato válido e único
- `phone_number`: 10-11 dígitos
- `role`: mínimo 2 caracteres
- `birth_date`: data válida (1900 até hoje)
- `message`: 10-500 caracteres

---

#### 🔒 Rotas Protegidas

> **Nota:** Todas as rotas abaixo requerem header `Authorization: Bearer <token>`

##### GET /leads

Listar leads com filtros e paginação.

**Query Parameters:**

- `name` (opcional): Filtro por nome (busca parcial)
- `email` (opcional): Filtro por email (busca parcial)
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10, máximo: 100)

**Examples:**

```bash
# Listar todos (primeira página, 10 itens)
GET /leads

# Filtrar por nome
GET /leads?name=João

# Filtrar por email
GET /leads?email=gmail

# Paginação
GET /leads?page=2&limit=5

# Combinar filtros
GET /leads?name=Maria&email=hotmail&page=1&limit=20
```

**Response (200):**

```json
{
  "result": {
    "leads": [
      {
        "id": "uuid-123",
        "name": "João Silva",
        "email": "joao@email.com",
        "phone_number": "11999999999",
        "role": "Desenvolvedor",
        "birth_date": "1990-05-15T00:00:00.000Z",
        "message": "Interessado em oportunidades"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "total_pages": 5
  },
  "status": 200
}
```

---

##### GET /leads/:id

Buscar lead por ID.

**Response (200):**

```json
{
  "result": {
    "id": "uuid-123",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone_number": "11999999999",
    "role": "Desenvolvedor",
    "birth_date": "1990-05-15T00:00:00.000Z",
    "message": "Interessado em oportunidades"
  },
  "status": 200
}
```

**Errors:**

- `404` - Lead não encontrado

---

##### PUT /leads/:id

Atualizar lead existente.

**Request (todos os campos opcionais):**

```json
{
  "name": "João Santos",
  "email": "joao.santos@email.com",
  "role": "Senior Developer"
}
```

**Response (200):**

```json
{
  "result": {
    "id": "uuid-123",
    "name": "João Santos",
    "email": "joao.santos@email.com",
    "phone_number": "11999999999",
    "role": "Senior Developer",
    "birth_date": "1990-05-15T00:00:00.000Z",
    "message": "Interessado em oportunidades"
  },
  "status": 200
}
```

**Validações:**

- Pelo menos um campo deve ser fornecido
- Mesmas validações do POST (quando fornecidos)

**Errors:**

- `404` - Lead não encontrado

---

##### DELETE /leads/:id

Deletar lead.

**Response (200):**

```json
{
  "result": {
    "message": "Lead deletado com sucesso"
  },
  "status": 200
}
```

**Errors:**

- `404` - Lead não encontrado

---

### 🚨 Códigos de Erro Comuns

| Código | Descrição             | Exemplo                               |
| ------ | --------------------- | ------------------------------------- |
| `400`  | Bad Request           | Dados inválidos ou faltando           |
| `401`  | Unauthorized          | Token inválido/expirado/não fornecido |
| `404`  | Not Found             | Lead não encontrado                   |
| `422`  | Validation Error      | Dados não passaram na validação       |
| `500`  | Internal Server Error | Erro interno do servidor              |

### 📊 Exemplos com cURL

#### 1. Fazer Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### 2. Criar Lead

```bash
curl -X POST http://localhost:3000/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@test.com",
    "phone_number": "11999999999",
    "role": "Developer",
    "birth_date": "1990-01-01",
    "message": "Interessado em oportunidades"
  }'
```

#### 3. Listar Leads (com token)

```bash
curl -X GET http://localhost:3000/leads \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

#### 4. Buscar Lead por ID

```bash
curl -X GET http://localhost:3000/leads/uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

#### 5. Atualizar Lead

```bash
curl -X PUT http://localhost:3000/leads/uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"name": "João Santos"}'
```

#### 6. Deletar Lead

```bash
curl -X DELETE http://localhost:3000/leads/uuid-123 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🔧 Variáveis de Ambiente

### Configuração inicial

1. Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:

```env
# Database credentials
POSTGRES_USER=leads_user
POSTGRES_PASSWORD=leads_password
POSTGRES_DB=leads_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# PostgreSQL database connection string
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

# JWT Authentication
JWT_SECRET=sua-chave-secreta-super-segura
AUTH_USERNAME=admin
AUTH_PASSWORD=admin123
```

### Variáveis disponíveis

| Variável            | Descrição               | Valor padrão           |
| ------------------- | ----------------------- | ---------------------- |
| `POSTGRES_USER`     | Usuário do PostgreSQL   | `leads_user`           |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL     | `leads_password`       |
| `POSTGRES_DB`       | Nome do banco de dados  | `leads_db`             |
| `POSTGRES_HOST`     | Host do PostgreSQL      | `localhost`            |
| `POSTGRES_PORT`     | Porta do PostgreSQL     | `5432`                 |
| `DATABASE_URL`      | URL completa de conexão | Gerada automaticamente |
| `JWT_SECRET`        | Chave secreta do JWT    | Definir valor seguro   |
| `AUTH_USERNAME`     | Usuário da API          | `admin`                |
| `AUTH_PASSWORD`     | Senha da API            | `admin123`             |

### ⚠️ Segurança

Em produção, certifique-se de:

- Usar uma `JWT_SECRET` forte e única
- Alterar `AUTH_USERNAME` e `AUTH_PASSWORD` padrão
- Usar HTTPS sempre
- Não commitar o arquivo `.env`

## 🏗️ Arquitetura e Tecnologias

### Stack Tecnológico

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **Prisma** - ORM e query builder
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **Zod** - Validação de schemas
- **Docker** - Containerização

### Arquitetura

```
src/
├── cases/                    # Use cases (business logic)
│   └── Lead/
│       ├── create/          # Criar lead
│       ├── read/            # Listar/buscar leads
│       ├── update/          # Atualizar lead
│       └── delete/          # Deletar lead
├── controllers/             # Controllers HTTP
│   └── auth_controller.ts
├── data/
│   ├── database/           # Configuração do banco
│   └── repositories/       # Repositórios de dados
│       ├── interfaces/     # Contratos/interfaces
│       └── implementations/ # Implementações concretas
├── domain/
│   └── entities/           # Entidades de domínio
├── middlewares/            # Middlewares Express
├── routes/                 # Definição de rotas
├── setup/                  # Injeção de dependências
└── utils/                  # Utilitários
    ├── errors/             # Tratamento de erros
    ├── process/            # Processamento
    └── zod/                # Validações
```

### Padrões Implementados

- **Clean Architecture** - Separação clara de responsabilidades
- **Repository Pattern** - Abstração da camada de dados
- **Use Cases** - Lógica de negócio isolada
- **Dependency Injection** - Inversão de dependências
- **Error Handling** - Tratamento robusto de erros
- **Input Validation** - Validação com Zod
- **JWT Authentication** - Autenticação moderna

### Features

- ✅ **CRUD Completo** - Create, Read, Update, Delete
- ✅ **Autenticação JWT** - Login seguro com tokens
- ✅ **Filtros Avançados** - Busca por nome e email
- ✅ **Paginação** - Listagem eficiente com pagination
- ✅ **Validação Robusta** - Schemas Zod para todos inputs
- ✅ **Tratamento de Erros** - Respostas consistentes
- ✅ **Tipagem Forte** - TypeScript em 100% do código
- ✅ **Banco Relacional** - PostgreSQL com Prisma
- ✅ **Containerização** - Docker para desenvolvimento
- ✅ **Documentação** - README completo

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.
