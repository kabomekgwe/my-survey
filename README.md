# 📊 My Survey - Comprehensive Survey Management Platform

A modern, full-stack survey management application that combines the best features from leading survey platforms like Typeform, SurveyMonkey, Qualtrics, and more.

## 🚀 Features

### 🎨 Beautiful Survey Builder
- **Drag & Drop Interface** - Intuitive survey creation with visual builder
- **15+ Question Types** - Text, multiple choice, rating scales, matrix, file upload, and more
- **Conditional Logic** - Advanced branching and skip logic
- **Real-time Preview** - See your survey as you build it
- **Template Library** - 50+ pre-built survey templates

### 📱 Responsive Survey Experience
- **Mobile-First Design** - Optimized for all devices
- **Conversational UI** - Typeform-style one-question-at-a-time flow
- **Progress Tracking** - Visual progress indicators
- **Save & Resume** - Allow respondents to continue later
- **Multi-language Support** - Global survey distribution

### 📈 Advanced Analytics
- **Real-time Dashboard** - Live response tracking
- **Custom Reports** - Build your own analytics views
- **Data Visualization** - Beautiful charts and graphs
- **Export Options** - CSV, PDF, Excel export
- **Statistical Analysis** - Advanced data insights

### 🔧 Enterprise Features
- **Team Collaboration** - Real-time collaborative editing
- **Role-based Access** - Granular permissions system
- **White-label Options** - Custom branding
- **API Integration** - Webhooks and REST API
- **SSO Support** - Enterprise authentication

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Mantine** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **React Query** - Server state management

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeScript** - End-to-end type safety
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Robust relational database
- **Redis** - Caching and session management

### DevOps & Tools
- **Docker** - Containerized deployment
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality and formatting
- **Jest** - Testing framework

## 🏗️ Project Structure

```
my-survey/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── users/    # User management
│   │   ├── surveys/  # Survey CRUD operations
│   │   ├── responses/# Response collection
│   │   ├── analytics/# Data processing
│   │   └── common/   # Shared utilities
│   └── prisma/       # Database schema
├── frontend/         # Next.js 15 application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   │   ├── survey-builder/
│   │   ├── survey-renderer/
│   │   └── analytics/
│   └── lib/          # Utilities and API client
├── shared/           # Common TypeScript types
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kabomekgwe/my-survey.git
   cd my-survey
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend  
   cp frontend/.env.example frontend/.env.local
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Frontend Components](./docs/components.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run backend tests
npm run test:backend

# Run frontend tests  
npm run test:frontend
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production servers
npm run start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by the best features from:
- Typeform - Beautiful conversational surveys
- SurveyMonkey - Ease of use and templates
- Qualtrics - Advanced analytics and logic
- Survey Sparrow - Mobile-first design
- SurveyJS - Customization and flexibility

---

**Built with ❤️ by [kabo mekgwe](https://github.com/kabomekgwe)**
