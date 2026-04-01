#!/bin/sh
set -e

# Se as variáveis POSTGRES_* existem, montamos a URL
if [ -n "$POSTGRES_HOST" ]; then
    export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
    echo "✅ DATABASE_URL configurada via variáveis de ambiente."
fi



echo "🔧 Gerando cliente Prisma..."
npx prisma generate

echo "🔄 Executando migrações..."
npx prisma migrate deploy

echo "🚀 Iniciando aplicação..."
echo "📂 Listando conteúdo da pasta dist para debug:"
find ./dist -name "main.js"
exec node dist/src/main.js