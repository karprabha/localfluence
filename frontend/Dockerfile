# Build Stage 1
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Build Stage 2
FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/public ./public
COPY --from=builder --chown=node:node /usr/src/app/.next/standalone ./
COPY --from=builder --chown=node:node /usr/src/app/.next/static ./.next/static

USER node

CMD ["node", "server.js"]
