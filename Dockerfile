# Stage 1: install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm install

# Stage 2: build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
ARG ENV_FILE
RUN echo $ENV_FILE
RUN echo $ENV_FILE > ./.env
COPY *.json *.d.ts next.config.mjs postcss.config.cjs postcss.config.js tailwind.config.ts ./
RUN npm run build

# Stage 3: run
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/*.json ./
COPY --from=builder /app/*.d.ts ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/postcss.config.cjs ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/tailwind.config.ts ./
CMD ["npm", "run", "start"]
