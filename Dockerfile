FROM node:lts-alpine3.23 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.28.2
WORKDIR /app

# Stage: Instalar dependências
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage: Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# Stage: Produção
FROM node:lts-alpine3.23 AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

# Instalar pnpm, dos2unix e prisma globalmente
RUN npm install -g pnpm@10.28.2 prisma && apk add --no-cache dos2unix

# Criar usuário não-root e dar permissões
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nestjs && \
  mkdir -p /app/src && \
  chown -R nestjs:nodejs /app

# Copiar arquivos necessários
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --chown=nestjs:nodejs entrypoint.sh ./entrypoint.sh
COPY --from=builder --chown=nestjs:nodejs /app/src ./src 
COPY --chown=nestjs:nodejs entrypoint.sh ./entrypoint.sh

COPY --from=builder --chown=nestjs:nodejs /app/prisma.config.ts ./prisma.config.ts

# Converter quebras de linha e dar permissão
RUN dos2unix ./entrypoint.sh && chmod +x ./entrypoint.sh

USER nestjs

EXPOSE 3000

CMD ["./entrypoint.sh"]
