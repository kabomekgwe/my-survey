---
type: "manual"
---

# Testing Strategy

## Test-Driven Development
- Practice Test-Driven Development (TDD) for new modules: write failing tests before implementation.
- Follow the Red-Green-Refactor cycle: failing test → minimal implementation → refactor.
- Write tests that describe the expected behavior, not the implementation details.
- Use descriptive test names that explain the scenario and expected outcome.
- Group related tests using describe/context blocks with clear hierarchical organization.

## Test Coverage and Types
- Each new feature must include unit tests covering all public methods and edge cases.
- Maintain minimum 80% code coverage with focus on critical business logic.
- Implement integration tests for API endpoints and database interactions.
- Use end-to-end tests for critical user journeys and workflows.
- Write contract tests for external API integrations and service boundaries.

## Test Organization and Naming
- All test files must use `.test.ts` or `.spec.ts` suffix for TypeScript projects.
- Mirror the source code directory structure in test directories.
- Use clear, descriptive test names: `should return user data when valid ID provided`.
- Group tests by functionality using nested describe blocks.
- Use setup and teardown hooks (beforeEach, afterEach) for test isolation.

## Test Quality Standards
- Tests must not depend on global state or execution order (isolated and idempotent).
- Use mocks/stubs for all external service calls to avoid flakiness and network dependence.
- Mock time-dependent functions (Date.now, setTimeout) for deterministic tests.
- Use test data builders or factories for creating consistent test data.
- Implement proper cleanup in tests to prevent resource leaks and side effects.

## Testing Tools and Frameworks
- Use Jest for unit and integration testing with TypeScript support.
- Use React Testing Library for frontend component testing with user-centric approach.
- Use Supertest for API endpoint testing with proper request/response validation.
- Use Playwright or Cypress for end-to-end testing with cross-browser support.
- Use MSW (Mock Service Worker) for mocking external APIs in tests.

## Bug-Driven Testing
- If a bug is discovered, first write a test that reproduces it, then fix the bug.
- Add regression tests for all critical bugs to prevent reoccurrence.
- Use property-based testing (fast-check) for complex algorithms and edge cases.
- Implement mutation testing to verify test quality and coverage effectiveness.
- The test runner must return zero failures before PR approval.

## Cross-References
- See @coding-standards for test code quality requirements.
- See @frontend-ui for frontend testing specifics.
- See @backend-api for backend testing approaches.
- See @accessibility for accessibility testing integration.
- See @code-review-automation for automated testing in CI/CD.


