---
type: "always"
description: "Deployment and CI/CD pipeline standards"
tags: [deployment, ci-cd, devops, infrastructure]
---

# Deployment and CI/CD Rules

## Pipeline Standards
- Implement multi-stage pipelines: build → test → security scan → deploy.
- Use infrastructure as code (IaC) for all environment provisioning and configuration.
- Implement automated rollback mechanisms for failed deployments.
- Use blue-green or canary deployment strategies for zero-downtime deployments.
- Maintain separate pipelines for different environments (dev, staging, production).

## Build and Artifact Management
- Use reproducible builds with locked dependency versions and checksums.
- Implement artifact signing and verification for security and integrity.
- Store build artifacts in secure, versioned artifact repositories.
- Use multi-stage Docker builds to minimize image size and attack surface.
- Implement automated vulnerability scanning for container images.

## Environment Management
- Use environment-specific configuration files with secret management integration.
- Implement proper secret rotation and never store secrets in code or config files.
- Use feature flags to control deployment of new features independently from code deployment.
- Maintain environment parity between development, staging, and production.
- Implement automated environment provisioning and teardown for testing.

## Deployment Safety
- Require manual approval for production deployments with proper change management.
- Implement automated health checks and smoke tests after deployment.
- Use database migration strategies that support rollback and zero-downtime updates.
- Implement circuit breakers and graceful degradation for service dependencies.
- Maintain deployment runbooks with rollback procedures and emergency contacts.

## Monitoring and Observability
- Implement deployment tracking with correlation to application metrics and errors.
- Set up automated alerts for deployment failures and performance degradation.
- Use distributed tracing to monitor request flows across deployed services.
- Implement log aggregation and centralized monitoring for all deployed services.
- Track deployment frequency, lead time, and failure rate as key DevOps metrics.

## Security and Compliance
- Implement security scanning at every stage of the CI/CD pipeline.
- Use least-privilege access controls for deployment automation and service accounts.
- Implement audit logging for all deployment activities and configuration changes.
- Use signed commits and verified builds to ensure code integrity.
- Maintain compliance with relevant standards (SOC2, PCI-DSS) through automated controls.

## Cross-References
- See @code-review-automation for CI/CD integration with code review.
- See @security-policy for security requirements in deployment pipelines.
- See @testing-strategy for automated testing in CI/CD.
- See @logging-monitoring for deployment monitoring and observability.
- See @project-guidelines for deployment and release management.
