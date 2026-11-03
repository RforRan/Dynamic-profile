# ==============================================================================
# STAGE 1: Build Environment (Node.js 20 Alpine)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Layer Caching Optimization: Copy package manifests first
COPY package.json package-lock.json ./

# Clean deterministic dependency installation
RUN npm ci

# Build-time Arguments (configurable via --build-arg)
ARG PUBLIC_GITHUB_USERNAME=RforRan
ARG GITHUB_TOKEN=""
ARG BASE_PATH="/"

# Expose arguments to Astro compiler
ENV PUBLIC_GITHUB_USERNAME=$PUBLIC_GITHUB_USERNAME
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV BASE_PATH=$BASE_PATH
ENV NODE_ENV=production

# Copy application source code (filtered by .dockerignore)
COPY . .

# Compile static assets via Astro SSG into /app/dist
RUN npm run build

# ==============================================================================
# STAGE 2: Production Web Server (Ultra-lightweight Nginx Alpine)
# ==============================================================================
FROM nginx:1.27-alpine AS runner

# Remove default Nginx site configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy production-hardened Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy pre-rendered static artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Healthcheck to verify container readiness
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
