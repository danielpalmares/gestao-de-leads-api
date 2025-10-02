# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar tsconfig e tsup config
COPY tsconfig*.json tsup.config.ts ./

# Copiar código fonte
COPY src ./src

# Gerar Prisma Client
RUN yarn db:generate

# Build da aplicação
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Instalar apenas dependências de produção
RUN yarn install --frozen-lockfile --production

# Copiar Prisma Client gerado e build
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 3000

# Comando para iniciar aplicação
CMD ["yarn", "start"]