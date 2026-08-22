# Build stage
FROM harbor-dev.insightst.com/library/frontend-base:node22.21.1-nginx-trixie AS builder

WORKDIR /app

# Copy dependency manifests (monorepo workspaces require all package.json files)
COPY package.json package-lock.json turbo.json ./
COPY apps/docs/package.json ./apps/docs/
COPY apps/playground/package.json ./apps/playground/
COPY packages/theme/package.json ./packages/theme/
COPY packages/ui/package.json ./packages/ui/
COPY packages/icons/package.json ./packages/icons/
COPY packages/hooks/package.json ./packages/hooks/
COPY packages/utils/package.json ./packages/utils/

RUN npm config set registry https://npm-registry.insightst.com/

# Install all workspace dependencies including devDependencies needed for build
ENV NODE_ENV=development
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Final stage
FROM harbor-dev.insightst.com/library/frontend-base:node22.21.1-nginx-trixie

WORKDIR /var/www/html

# Remove default content and copy built files
RUN rm -rf ./*
COPY --from=builder /app/apps/docs/dist dist

# Copy nginx configuration
COPY conf/nginx.conf /etc/nginx/sites-enabled/default

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
