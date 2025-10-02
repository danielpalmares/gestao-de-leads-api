# 🚀 Gestão de Leads API

API para gerenciamento de leads desenvolvida com Node.js, TypeScript, Express, Prisma e PostgreSQL.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Configuração do Ambiente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar banco de dados

#### Iniciar PostgreSQL com Docker

```bash
npm run db:up
```

#### Gerar cliente Prisma

```bash
npm run db:generate
```

#### Executar migrações

```bash
npm run db:migrate
```

#### Popular banco com dados de exemplo (opcional)

```bash
npm run db:seed
```

### 3. Iniciar aplicação

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

## 📝 Endpoints da API

### Leads

- `POST /leads` - Criar lead
- `GET /leads` - Listar todos os leads
- `GET /leads/:id` - Buscar lead por ID
- `PUT /leads/:id` - Atualizar lead
- `DELETE /leads/:id` - Deletar lead

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
