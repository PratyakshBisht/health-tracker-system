# Health Tracker System

A production-ready full-stack health tracking application that enables users to monitor and manage their health and fitness metrics.

## Features

### Core Functionality
- 🔐 **User Authentication** - Secure JWT-based authentication with refresh tokens
- 👤 **User Profiles** - Comprehensive user profile management
- 📊 **Health Metrics Tracking**
  - BMI Calculator
  - Weight Tracking
  - Water Intake Logging
  - Daily Calorie Tracking
  - Exercise Logging
  - Sleep Tracking
  - Heart Rate Monitoring
  - Blood Pressure Logging
- 📈 **Analytics & Visualization** - Interactive charts and dashboards
- 🏃 **Goal Management** - Set and track health goals
- 📋 **Progress Reports** - Generate comprehensive health reports
- 🔔 **Notifications** - Real-time health alerts and reminders
- 📤 **Data Export** - Export data to PDF and CSV formats
- 🏛️ **Admin Dashboard** - Administrative controls and user management

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Refresh Tokens + bcrypt
- **Validation**: Zod
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Charts**: Recharts
- **Testing**: Vitest

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Architecture

The project follows **Clean Architecture** principles with:
- Clear separation of concerns
- Repository pattern for data access
- Modular folder structure
- SOLID principles
- Environment-based configuration

### Project Structure

```
health-tracker-system/
├── apps/
│   ├── backend/          # Express.js API server
│   │   ├── src/
│   │   │   ├── config/       # Configuration files
│   │   │   ├── domain/       # Business logic entities
│   │   │   ├── application/  # Use cases and services
│   │   │   ├── infrastructure/ # Database, external services
│   │   │   ├── presentation/ # Controllers and routes
│   │   │   ├── middleware/   # Express middleware
│   │   │   ├── utils/        # Utility functions
│   │   │   └── main.ts       # Application entry point
│   │   ├── tests/        # Test files
│   │   ├── prisma/       # Database schema and migrations
│   │   └── package.json
│   └── frontend/         # React.js client application
│       ├── src/
│       │   ├── components/   # Reusable React components
│       │   ├── pages/        # Page components
│       │   ├── hooks/        # Custom React hooks
│       │   ├── context/      # React context providers
│       │   ├── services/     # API client and services
│       │   ├── types/        # TypeScript type definitions
│       │   ├── utils/        # Utility functions
│       │   ├── styles/       # Global styles
│       │   └── App.tsx       # Root component
│       ├── tests/        # Test files
│       └── package.json
├── docker-compose.yml    # Multi-container orchestration
├── Dockerfile            # Backend Docker image
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── .eslintrc.json
├── .prettierrc.json
├── tsconfig.json
├── package.json          # Root workspace configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 8+ or yarn
- PostgreSQL 13+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PratyakshBisht/health-tracker-system.git
   cd health-tracker-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Using Docker
   npm run docker:up
   
   # Or with local PostgreSQL
   npm --workspace=backend run db:migrate
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:5173

## Development

### Available Scripts

```bash
# Start development servers (frontend and backend)
npm run dev

# Build for production
npm run build

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Docker operations
npm run docker:up
npm run docker:down
npm run docker:logs
```

### Workspace-specific commands

```bash
# Backend only
npm --workspace=backend run dev
npm --workspace=backend run build
npm --workspace=backend run test

# Frontend only
npm --workspace=frontend run dev
npm --workspace=frontend run build
npm --workspace=frontend run test
```

## API Documentation

API endpoints are organized by domain:
- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/health-metrics` - Health data endpoints
- `/api/goals` - Goal management
- `/api/reports` - Report generation
- `/api/admin` - Administrative endpoints

Detailed API documentation is available in `apps/backend/API.md`

## Testing

### Backend
- Unit tests for services and repositories
- Integration tests for API endpoints
- Test coverage: >80%

```bash
npm --workspace=backend run test
npm --workspace=backend run test:coverage
```

### Frontend
- Component tests using Vitest
- Integration tests for pages
- Test coverage: >80%

```bash
npm --workspace=frontend run test
npm --workspace=frontend run test:coverage
```

## Deployment

The application is containerized and ready for deployment. See `DEPLOYMENT.md` for detailed deployment instructions.

## Contributing

This project follows:
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- Code review process via pull requests

### Git Workflow

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes following code standards
3. Commit with conventional messages: `git commit -m 'feat: add new feature'`
4. Push and create a pull request
5. Ensure all checks pass
6. Merge after review

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/PratyakshBisht/health-tracker-system/issues) page.

---

**Last Updated**: 2025-01-04
