# Multi-stage Dockerfile for AgroJaya Full-Stack ERP (Backend API + Frontend SPA + Mobile Web)
FROM node:22-alpine AS builder

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Build Frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build

# Build Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
RUN cd backend && npx prisma generate && npm run build

# Final Production Runner
FROM node:22-alpine AS runner

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY backend/package*.json ./backend/
COPY backend/prisma ./backend/prisma
RUN cd backend && npm install --omit=dev && npx prisma generate

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 80

CMD ["node", "backend/dist/index.js"]
