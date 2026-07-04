FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN npm ci

# Copy source
COPY apps/backend ./apps/backend
COPY prisma ./prisma

WORKDIR /app/apps/backend

# Build
RUN npm run build

# Run migrations
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
