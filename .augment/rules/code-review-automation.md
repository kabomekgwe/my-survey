---
type: "auto"
description: "Automated code review and CI/CD integration standards"
tags: [automation, ci-cd, code-review, quality-gates]
---

# Code Review Automation Rules

## Automated Quality Gates
- All PRs must pass automated linting (ESLint, Prettier) before review.
- Implement automated security scanning (Snyk, CodeQL) in CI pipeline.
- Run automated accessibility tests (axe-core) for frontend changes.
- Execute full test suite with minimum 80% code coverage requirement.
- Perform automated dependency vulnerability scanning on every commit.

## Static Code Analysis
- Use SonarQube or similar tools for code quality metrics and technical debt tracking.
- Implement automated code complexity analysis with configurable thresholds.
- Run type checking (TypeScript strict mode) as part of CI pipeline.
- Use automated code formatting (Prettier) with pre-commit hooks.
- Implement import/export analysis to detect unused code and circular dependencies.

## Review Assignment Automation
- Automatically assign reviewers based on code ownership (CODEOWNERS file).
- Require at least 2 approvals for changes to critical paths or security-sensitive code.
- Implement automatic re-review requests when significant changes are made after approval.
- Use automated reviewer rotation to distribute review load across team members.
- Require domain expert review for changes to specific modules or technologies.

## Merge Protection Rules
- Prevent direct pushes to main/production branches; require PR workflow.
- Require all status checks to pass before allowing merge.
- Implement automatic branch deletion after successful merge.
- Use squash merging for feature branches to maintain clean commit history.
- Require up-to-date branches before merge to prevent integration issues.

## Automated Testing Integration
- Run unit tests, integration tests, and e2e tests in parallel for faster feedback.
- Implement test result reporting with detailed failure information.
- Use test impact analysis to run only affected tests for faster CI cycles.
- Implement automated performance regression testing for critical paths.
- Generate and publish test coverage reports with trend analysis.

## Notification and Reporting
- Send automated notifications for failed builds, security vulnerabilities, and review requests.
- Generate automated code quality reports and share with team regularly.
- Implement automated deployment notifications with rollback instructions.
- Use automated changelog generation from conventional commits.
- Create automated metrics dashboards for code quality trends and team productivity.

## Cross-References
- See @pr-review-checklist for manual review requirements.
- See @testing-strategy for automated testing integration.
- See @security-policy for security scanning automation.
- See @deployment-cicd for CI/CD pipeline integration.
- See @accessibility for automated accessibility testing.
