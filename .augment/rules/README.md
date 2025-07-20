---
type: "manual"
description: "Index and overview of all Augment rules and guidelines"
---

# Augment Rules Index

This directory contains comprehensive development rules and guidelines for the project. Rules are organized by category and include cross-references to related guidelines.

## Rule Types

- **`always`** - Non-negotiable standards that must always be followed
- **`auto`** - Rules automatically applied by tools and CI/CD
- **`manual`** - Guidelines requiring manual review and enforcement
- **`agent_requested`** - Rules specifically for AI agent behavior and code generation

## Core Standards (Always Apply)

### [always.md](./always.md)
Non-negotiable organizational standards including TypeScript strict mode, testing requirements, and ULID usage.

### [coding-standards.md](./coding-standards.md)
General coding standards covering naming conventions, type safety, code organization, and quality standards.

### [error-handling.md](./error-handling.md)
Comprehensive error handling patterns for frontend, backend, and database operations.

### [security-policy.md](./security-policy.md)
Security requirements including secrets management, input validation, authentication, and data protection.

## Development Guidelines

### Frontend Development
- **[frontend-ui.md](./frontend-ui.md)** - Next.js, React, and UI development standards
- **[accessibility.md](./accessibility.md)** - WCAG compliance and inclusive design guidelines

### Backend Development
- **[backend-api.md](./backend-api.md)** - NestJS, Prisma, and API development standards
- **[database-design.md](./database-design.md)** - Database design principles and Prisma guidelines
- **[api-design.md](./api-design.md)** - RESTful API design and documentation standards

### Quality Assurance
- **[testing-strategy.md](./testing-strategy.md)** - Comprehensive testing approaches and TDD practices
- **[performance.md](./performance.md)** - Performance optimization for frontend, backend, and database

## Process and Workflow

### Code Review
- **[pr-review-checklist.md](./pr-review-checklist.md)** - Comprehensive PR review requirements
- **[review-checklist.md](./review-checklist.md)** - General code review checklist
- **[code-review-automation.md](./code-review-automation.md)** - Automated review and CI/CD integration

### Project Management
- **[project-guidelines.md](./project-guidelines.md)** - Project-wide conventions and guidelines
- **[agent-behavior.md](./agent-behavior.md)** - AI agent behavior and safety guidelines

### Operations
- **[deployment-cicd.md](./deployment-cicd.md)** - Deployment and CI/CD pipeline standards
- **[logging-monitoring.md](./logging-monitoring.md)** - Logging, monitoring, and observability guidelines

### Documentation
- **[documentation.md](./documentation.md)** - Code and API documentation requirements

## Quick Reference

### For New Features
1. Follow @always rules (TypeScript strict, testing, ULIDs)
2. Check @coding-standards for code quality
3. Implement @error-handling patterns
4. Follow @security-policy for security
5. Add tests per @testing-strategy
6. Update docs per @documentation

### For Frontend Work
- @frontend-ui for React/Next.js standards
- @accessibility for WCAG compliance
- @performance for optimization
- @testing-strategy for component testing

### For Backend Work
- @backend-api for NestJS/Prisma patterns
- @database-design for schema design
- @api-design for REST standards
- @security-policy for API security

### For DevOps/Deployment
- @deployment-cicd for pipeline standards
- @logging-monitoring for observability
- @code-review-automation for CI integration
- @security-policy for deployment security

## Cross-Reference Map

Rules are interconnected with `@rule-name` references. Key relationships:

- **Core Standards** → All other rules reference these
- **Frontend/Backend** → Reference testing, security, performance
- **Testing** → Referenced by all development rules
- **Security** → Referenced by all technical rules
- **Performance** → Referenced by frontend, backend, database
- **Documentation** → Referenced by API design and review processes

## Usage Guidelines

1. **Start with Core Standards** - Always apply @always, @coding-standards, @error-handling, @security-policy
2. **Follow Domain Rules** - Use frontend/backend specific rules for your work area
3. **Check Cross-References** - Follow @rule-name links for related requirements
4. **Update Documentation** - Keep rules current as practices evolve
5. **Enforce in Reviews** - Use checklists during code review process

## Maintenance

- Rules should be updated as practices evolve
- Cross-references should be maintained when rules change
- New rules should include appropriate cross-references
- Deprecated practices should be removed promptly
