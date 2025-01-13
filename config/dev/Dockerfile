# Используем образ Node.js для сборки приложения
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json ./
COPY yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV VITE_API_DEV_SERVER=http://localhost:8888/
ENV VITE_API_PROD_SERVER=/
ENV VITE_NODE_ENV=development

# Экспортируем порт 3000 наружу
EXPOSE 3000

CMD ["yarn", "dev"]