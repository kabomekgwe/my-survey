---
type: "always"
description: "Error handling patterns and exception management standards"
tags: [error-handling, exceptions, resilience]
---

# Error Handling Rules

## Exception Handling Patterns
- Use specific exception types rather than generic Error or Exception classes.
- Implement proper error boundaries in React applications to prevent app crashes.
- Always handle async/await operations with try-catch blocks or .catch() methods.
- Never suppress errors silently; always log or handle them appropriately.
- Use error codes and structured error responses for API endpoints.

## API Error Responses
- Return consistent error response format with status code, message, and error code.
- Use appropriate HTTP status codes (400 for client errors, 500 for server errors).
- Provide helpful error messages that guide users toward resolution.
- Include correlation IDs in error responses for debugging and support.
- Never expose internal system details or stack traces in production error responses.

## Frontend Error Handling
- Implement global error handlers for unhandled promise rejections and errors.
- Show user-friendly error messages instead of technical error details.
- Provide fallback UI components when data loading fails.
- Implement retry mechanisms for transient failures (network timeouts, etc.).
- Use error tracking services (Sentry, Bugsnag) to monitor and alert on errors.

## Backend Error Handling
- Implement circuit breaker patterns for external service dependencies.
- Use exponential backoff for retry logic with maximum retry limits.
- Validate all input data and return meaningful validation error messages.
- Implement proper timeout handling for database queries and external API calls.
- Use structured logging to capture error context and stack traces.

## Database Error Handling
- Handle database connection failures gracefully with connection pooling.
- Implement proper transaction rollback on errors to maintain data consistency.
- Use database constraints and handle constraint violation errors appropriately.
- Implement deadlock detection and retry logic for concurrent operations.
- Monitor and alert on database error rates and connection pool exhaustion.

## Monitoring and Alerting
- Set up error rate monitoring with thresholds for different error types.
- Implement health checks that verify system dependencies and data integrity.
- Use distributed tracing to track errors across service boundaries.
- Create runbooks for common error scenarios and recovery procedures.
- Implement automated recovery mechanisms where safe and appropriate.

## Cross-References
- See @logging-monitoring for error logging and monitoring standards.
- See @security-policy for security-related error handling.
- See @frontend-ui for frontend error handling patterns.
- See @backend-api for API error response standards.
