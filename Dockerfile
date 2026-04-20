# ChessWize landing page — multi-stage static build
# Build with bun (handles optional native deps correctly on arm64),
# serve final dist/ with Caddy (native HTTP Range support — required for
# Safari video playback; Vercel's `serve` drops Range headers through
# some proxy chains, causing Safari to refuse to play <video> elements).

FROM oven/bun:1 AS build
WORKDIR /app

# deps first for better layer caching. --frozen-lockfile enforces the
# committed bun.lock — no fallback to dev-style install — so prod builds
# are reproducible.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# source + build
COPY . .
RUN bun run build

# --- runtime: Caddy file-server, always returns 206 Partial Content
#     for Range requests on static assets (media, large images, etc.) ---
FROM caddy:2-alpine AS runtime
WORKDIR /srv
COPY --from=build /app/dist ./
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
# Caddy's default process honors the Caddyfile; file_server + try_files
# behavior + Range support are built-in.
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
