# Stage 1: Build Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend & Prisma
FROM node:22-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci
COPY backend/ ./
RUN npx prisma generate
RUN npm run build

# Stage 3: Production Runner (Monolithic Frontend + Backend)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

# 1. Setup Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/prisma ./prisma
COPY --from=backend-builder /app/backend/node_modules/.prisma ./node_modules/.prisma

# 2. Add Built Frontend Assets
# The Express server in backend/dist/index.js is configured to serve static files from /app/frontend/dist
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

EXPOSE 80

# Run Express Server
CMD ["node", "dist/index.js"]
