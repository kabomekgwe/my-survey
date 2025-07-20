---
mode: auto
description: "Backend API development standards for NestJS and Prisma"
tags: [backend, api, nestjs, prisma]
type: "agent_requested"
---
## Architecture and Layering
- Follow Service → Controller → DTO layering; keep business logic out of controllers.
- Use dependency injection for services and repositories to enable testing and modularity.
- Implement proper separation of concerns: controllers handle HTTP, services handle business logic.
- Use middleware for cross-cutting concerns (authentication, logging, validation).
- Implement proper error handling with global exception filters.

## Data Layer and ORM
- Generate types from Prisma schema; never hand-roll database models or types.
- Use Prisma's type-safe query methods and avoid raw SQL unless absolutely necessary.
- Implement proper database transactions for multi-step operations.
- Use Prisma's connection pooling and optimize query performance with includes/selects.
- Log all database mutations via audit middleware using shared logger utility.

## API Design and Validation
- Use class-validator and class-transformer for request/response validation and transformation.
- Implement proper DTO (Data Transfer Object) classes for all API endpoints.
- Use OpenAPI decorators to generate comprehensive API documentation.
- Implement proper HTTP status codes and consistent error response formats.
- Use versioning strategy for API endpoints to maintain backward compatibility.

## Security and Authentication
- Implement JWT-based authentication with proper token validation and refresh mechanisms.
- Use guards and decorators for role-based access control (RBAC).
- Implement rate limiting per endpoint with different limits based on operation type.
- Validate and sanitize all input data to prevent injection attacks.
- Use HTTPS only and implement proper CORS policies.

## Performance and Monitoring
- Implement caching strategies using Redis for frequently accessed data.
- Use database query optimization with proper indexing and query analysis.
- Implement proper logging with correlation IDs for request tracing.
- Monitor API performance metrics and set up alerts for degradation.
- Use connection pooling and implement graceful shutdown procedures.

## Testing and Quality
- Write comprehensive unit tests for all service methods and business logic.
- Implement integration tests for API endpoints with proper test database setup.
- Use mocking for external dependencies and services in unit tests.
- Implement contract testing for external API integrations.
- Maintain test coverage above 80% for critical business logic.

## Cross-References
- See @database-design for Prisma and database best practices.
- See @api-design for RESTful API design standards.
- See @security-policy for backend security requirements.
- See @testing-strategy for backend testing approaches.
- See @error-handling for API error handling patterns.
