---
type: "agent_requested"
description: "Performance optimization guidelines and best practices"
tags: [performance, optimization, monitoring]
---

# Performance Rules

## Frontend Performance
- Implement lazy loading for images and components not immediately visible.
- Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.
- Optimize bundle size with code splitting and tree shaking.
- Implement proper caching strategies for static assets (1 year) and API responses (appropriate TTL).
- Use Web Vitals metrics (LCP, FID, CLS) to measure and optimize user experience.
- Minimize JavaScript bundle size and defer non-critical scripts.

## Backend Performance
- Implement database query optimization with proper indexing and query analysis.
- Use connection pooling for database connections with appropriate pool sizes.
- Implement caching at multiple levels (Redis, CDN, application-level).
- Use async/await patterns and avoid blocking operations in request handlers.
- Implement rate limiting to prevent abuse and ensure fair resource usage.
- Monitor and optimize API response times with target < 200ms for critical endpoints.

## Database Performance
- Create indexes for all frequently queried columns and foreign keys.
- Use EXPLAIN ANALYZE to identify and optimize slow queries.
- Implement pagination for large result sets instead of returning all records.
- Use database-specific optimization features (e.g., Prisma query optimization).
- Monitor database performance metrics and set up alerts for slow queries.

## Monitoring and Metrics
- Implement comprehensive logging with structured data and correlation IDs.
- Set up performance monitoring with tools like New Relic, DataDog, or similar.
- Track key performance indicators (KPIs) and set up alerting for degradation.
- Implement health checks for all services and dependencies.
- Use distributed tracing for complex request flows across services.

## Cross-References
- See @frontend-ui for frontend-specific performance guidelines.
- See @backend-api for backend performance optimization.
- See @database-design for database performance best practices.
- See @logging-monitoring for performance monitoring and metrics.
