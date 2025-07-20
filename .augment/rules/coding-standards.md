---
type: "agent_requested"
description: "General coding standards and best practices"
---

# Coding Standards

## Naming Conventions
- Use descriptive, unambiguous names that clearly indicate purpose and scope.
- JavaScript/TypeScript: `camelCase` for variables/functions, `PascalCase` for classes/components.
- Constants: `SCREAMING_SNAKE_CASE` for module-level constants.
- Files: `kebab-case` for file names, `PascalCase` for React components.
- Avoid abbreviations unless they are widely understood (e.g., `id`, `url`, `api`).

## Type Safety and Documentation
- Use TypeScript strict mode with no implicit any types allowed.
- All function signatures must include explicit type annotations for parameters and return values.
- Use JSDoc comments for all public functions, classes, and complex logic.
- Document side effects, thrown exceptions, and async behavior in function comments.
- Use interface definitions for all object shapes and API contracts.

## Code Organization
- Limit all lines to 100 characters maximum for better readability.
- Functions should be single-purpose with maximum 50 lines of code.
- Use early returns to reduce nesting and improve readability.
- Group related functionality into modules with clear public interfaces.
- Avoid deep nesting (maximum 4 levels) by extracting functions or using guard clauses.

## Code Quality Standards
- All new code must pass ESLint and Prettier formatting before commit.
- Define constants for magic numbers and strings in dedicated constants files.
- Remove commented-out code unless accompanied by a ticket reference and explanation.
- Use TODO/FIXME comments only with ticket references: `// TODO: PROJ-123 - Refactor this logic`.
- Implement proper error handling with specific exception types, not generic Error.

## Cross-References
- See @testing-strategy for test-related coding standards.
- See @security-policy for security-related coding practices.
- See @performance for performance-related coding guidelines.
- See @frontend-ui for React/TypeScript specific standards.
- See @backend-api for backend coding patterns.
