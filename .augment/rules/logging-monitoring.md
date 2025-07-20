---
type: "always"
description: "Logging, monitoring, and observability standards"
tags: [logging, monitoring, observability, metrics]
---

# Logging and Monitoring Rules

## Structured Logging
- Use structured logging with JSON format for all application logs.
- Include correlation IDs to trace requests across service boundaries.
- Log at appropriate levels: ERROR for failures, WARN for recoverable issues, INFO for business events.
- Never log sensitive information (passwords, tokens, PII) in any log level.
- Include contextual information: user ID, request ID, timestamp, service name.

## Log Content Standards
- Log all authentication and authorization events for security auditing.
- Log all database mutations with before/after values for audit trails.
- Log external API calls with request/response metadata (not full payloads).
- Log performance metrics for critical operations (response times, query durations).
- Include stack traces only in ERROR level logs and sanitize sensitive data.

## Monitoring and Metrics
- Implement application performance monitoring (APM) with distributed tracing.
- Track business metrics alongside technical metrics (user actions, conversion rates).
- Set up synthetic monitoring for critical user journeys and API endpoints.
- Monitor infrastructure metrics: CPU, memory, disk usage, network latency.
- Implement custom metrics for domain-specific KPIs and business logic.

## Alerting Strategy
- Create alerts for error rates exceeding baseline thresholds (e.g., >1% error rate).
- Set up alerts for performance degradation (response time >95th percentile).
- Monitor dependency health and alert on external service failures.
- Implement escalation policies with different notification channels.
- Use alert fatigue prevention: group related alerts and set appropriate thresholds.

## Observability Best Practices
- Implement health check endpoints for all services with dependency status.
- Use feature flags to enable/disable monitoring and logging levels dynamically.
- Implement log sampling for high-volume applications to manage costs.
- Set up log retention policies based on compliance and operational requirements.
- Create dashboards for different audiences: developers, operations, business stakeholders.

## Security and Compliance
- Implement log integrity protection and tamper detection mechanisms.
- Ensure logs are encrypted in transit and at rest for sensitive applications.
- Set up log forwarding to centralized logging systems with proper access controls.
- Implement audit logging for all administrative actions and configuration changes.
- Comply with data retention and privacy regulations (GDPR, CCPA) for log data.

## Cross-References
- See @security-policy for security logging requirements.
- See @error-handling for error logging standards.
- See @performance for performance monitoring guidelines.
- See @deployment-cicd for deployment monitoring and alerting.
