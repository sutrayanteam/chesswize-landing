# ChessWize landing page — multi-stage static build
# Build with bun (handles optional native deps correctly on arm64),
# serve final dist/ with a minimal static server.

FROM oven/bun:1 AS build
WORKDIR /app

# deps first for better layer caching
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

# source + build
COPY . .
RUN bun run build

# --- runtime ---
FROM node:22-alpine AS runtime
WORKDIR /app
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
