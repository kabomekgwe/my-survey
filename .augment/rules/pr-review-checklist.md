---
type: "agent_requested"
description: "Comprehensive checklist for pull request reviews"
---
# PR Review Checklist

Before creating or merging a pull request, ensure the following checks are completed:

## Automated Quality Gates
- All code passes the CI build and automated tests with zero failures.
- Code coverage meets minimum threshold (80%) for new and modified code.
- All linting rules pass (ESLint, Prettier) with no warnings or errors.
- Security scanning passes with no high or critical vulnerabilities.
- Automated accessibility tests pass for frontend changes.

## Code Quality and Standards
- The code follows all coding standards (see @coding-standards).
- All new features and bug fixes include appropriate unit, integration, or end-to-end tests.
- Code is properly documented with JSDoc comments for public APIs.
- No commented-out code, debugging statements, or console.log calls remain.
- Error handling is implemented according to @error-handling guidelines.

## Documentation and Communication
- Documentation is updated for any changed APIs, function signatures, or workflows.
- The PR description summarizes all major changes, links to related tickets, and includes clear testing instructions.
- Breaking changes are clearly documented with migration instructions.
- Any visual/UI changes have attached before-and-after screenshots/gifs in the PR.
- Database schema changes include migration scripts and rollback procedures.

## Review Process
- All required reviewers are tagged, and team discussions are addressed or resolved before merging.
- At least 2 approvals are required for changes to critical paths or security-sensitive code.
- Domain experts have reviewed changes to their areas of expertise.
- PR does not modify files in protected directories unless there is a business case mentioned in the PR body.
- All CI/CD checks pass and deployment readiness is confirmed.

## Cross-References
- See @code-review-automation for automated review requirements.
- See @testing-strategy for test coverage and quality standards.
- See @security-policy for security review requirements.
- See @documentation for documentation update requirements.

