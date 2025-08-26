# Stage 1: Build
FROM node:lts-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:lts-slim

WORKDIR /app
COPY --from=builder /app/ /app/

EXPOSE 3000
CMD ["npm", "start"]
