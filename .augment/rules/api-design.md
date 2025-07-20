---
type: "agent_requested"
description: "RESTful API design standards and best practices"
tags: [api, rest, openapi, design]
---

# API Design Rules

## RESTful Design Principles
- Use HTTP methods semantically: GET (read), POST (create), PUT (update), DELETE (remove).
- Design resource-oriented URLs: `/users/{id}/posts` not `/getUserPosts?userId={id}`.
- Use plural nouns for resource collections: `/users`, `/posts`, `/comments`.
- Implement proper HTTP status codes: 200 (success), 201 (created), 400 (client error), 500 (server error).
- Use consistent URL patterns and avoid deep nesting beyond 2-3 levels.

## Request/Response Standards
- Accept and return JSON with consistent field naming (camelCase for JavaScript APIs).
- Implement request validation with clear error messages for invalid input.
- Use pagination for list endpoints with consistent parameters (page, limit, cursor).
- Include metadata in list responses: total count, pagination info, filtering applied.
- Support content negotiation and compression (gzip) for large responses.

## API Versioning
- Use URL path versioning for major API changes: `/api/v1/users`, `/api/v2/users`.
- Maintain backward compatibility within major versions whenever possible.
- Provide clear migration guides and deprecation notices for version changes.
- Support multiple API versions simultaneously during transition periods.
- Use semantic versioning for API releases and document breaking changes.

## Security Standards
- Implement proper authentication (JWT, OAuth2) and authorization for all endpoints.
- Use HTTPS for all API communications and redirect HTTP to HTTPS.
- Implement rate limiting per user/IP with appropriate limits for different endpoints.
- Validate and sanitize all input data to prevent injection attacks.
- Use CORS policies to control cross-origin access appropriately.

## Documentation and OpenAPI
- Maintain up-to-date OpenAPI/Swagger specifications for all endpoints.
- Include comprehensive examples for request/response payloads.
- Document all error responses with status codes and error message formats.
- Provide interactive API documentation for developers and testing.
- Include authentication requirements and rate limiting information.

## Performance and Caching
- Implement appropriate caching headers (Cache-Control, ETag) for cacheable responses.
- Use compression for large response payloads to reduce bandwidth usage.
- Implement request/response logging with correlation IDs for debugging.
- Monitor API performance metrics and set up alerts for degradation.
- Use CDN for static content and geographically distributed API responses.

## Cross-References
- See @backend-api for implementation-specific API guidelines.
- See @security-policy for API security requirements.
- See @documentation for API documentation standards.
- See @testing-strategy for API testing approaches.
- See @performance for API performance optimization.
