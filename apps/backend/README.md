# Health Tracker Backend

Express.js + TypeScript backend API for the Health Tracker System.

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── env.ts       # Environment variables
│   └── logger.ts    # Logging utility
├── domain/          # Business entities and validation schemas
│   └── user.ts      # User entity and Zod schemas
├── application/     # Business logic and services
│   └── services/
│       └── auth-service.ts
├── infrastructure/  # Data access and external services
│   ├── database.ts  # Prisma client initialization
│   └── repositories/
│       └── user-repository.ts
├── presentation/    # Controllers and routes
│   ├── controllers/
│   │   └── auth-controller.ts
│   └── routes/
│       └── auth-routes.ts
├── middleware/      # Express middleware
│   ├── auth-middleware.ts
│   └── error-handler.ts
└── main.ts         # Application entry point

prisma/
├── schema.prisma   # Database schema
└── seed.ts         # Database seeding

tests/             # Test files
├── auth-service.test.ts
└── auth-routes.test.ts
```

## Features Implemented

### Authentication Module
- ✅ User registration with email validation
- ✅ Secure password hashing with bcrypt
- ✅ User login with credentials validation
- ✅ JWT token generation (access + refresh)
- ✅ Token refresh endpoint
- ✅ JWT verification middleware
- ✅ Error handling and logging
- ✅ Zod validation for all payloads

### Database
- ✅ PostgreSQL schema with Prisma ORM
- ✅ User model with optional profile fields
- ✅ Related models (HealthMetric, Exercise, Sleep, etc.)
- ✅ Database seeding script
- ✅ Migration support

### Security
- ✅ CORS protection
- ✅ Helmet.js for HTTP headers
- ✅ Password hashing (bcrypt)
- ✅ JWT token-based authentication
- ✅ Environment-based configuration
- ✅ Input validation with Zod

### Testing
- ✅ Unit tests for AuthService
- ✅ Integration tests for auth endpoints
- ✅ Supertest for API testing
- ✅ Jest configuration with >70% coverage threshold

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   npm --workspace=backend install
   ```

2. **Setup environment**
   ```bash
   cp .env.local .env
   # Update .env with your database URL
   ```

3. **Setup database**
   ```bash
   npm --workspace=backend run db:migrate
   npm --workspace=backend run db:seed
   ```

4. **Start development server**
   ```bash
   npm --workspace=backend run dev
   ```

   Server will run at `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2025-01-04T10:00:00Z",
      "updatedAt": "2025-01-04T10:00:00Z",
      "deletedAt": null
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": { ... }
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

## Testing

```bash
# Run all tests
npm --workspace=backend run test

# Run tests in watch mode
npm --workspace=backend run test:watch

# Check coverage
npm --workspace=backend run test:coverage
```

## Code Quality

```bash
# Run linter
npm --workspace=backend run lint

# Format code
npm --workspace=backend run format
```

## Available Scripts

```bash
# Development
npm --workspace=backend run dev        # Start dev server with hot reload

# Building
npm --workspace=backend run build      # Build TypeScript to JavaScript
npm --workspace=backend run start      # Run built application

# Database
npm --workspace=backend run db:generate   # Generate Prisma client
npm --workspace=backend run db:migrate    # Run migrations
npm --workspace=backend run db:migrate:prod  # Run migrations in production
npm --workspace=backend run db:seed       # Seed database with sample data

# Testing
npm --workspace=backend run test          # Run all tests
npm --workspace=backend run test:watch    # Run tests in watch mode
npm --workspace=backend run test:coverage # Generate coverage report

# Code Quality
npm --workspace=backend run lint          # Run ESLint
npm --workspace=backend run format        # Format with Prettier
```

## Password Requirements

Passwords must meet the following criteria:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

Example: `Password123!`

## Environment Variables

See `.env.local` for all required environment variables.

## Next Steps

- [ ] Implement user profile endpoints
- [ ] Add health metrics endpoints
- [ ] Implement exercise logging
- [ ] Add sleep tracking
- [ ] Implement goal management
- [ ] Add dashboard endpoints
- [ ] Implement admin endpoints
- [ ] Add email notifications
- [ ] Implement PDF/CSV export
- [ ] Add rate limiting
- [ ] Implement logging system

## License

MIT
