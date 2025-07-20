---
type: "manual"
description: "Project-wide guidelines and conventions"
---

# Project Guidelines

- Follow semantic versioning (SemVer) for all releases.
- Use conventional commits for all commit messages (feat:, fix:, docs:, etc.).
- All feature branches must be created from the latest `main` branch.
- Branch naming convention: `feature/<ticket-id>-<short-description>` or `bugfix/<ticket-id>-<short-description>`.
- Delete feature branches after successful merge to keep repository clean.
- Use squash merging for feature branches to maintain clean commit history.
- All dependencies must be pinned to specific versions in production.
- Environment-specific configurations must be externalized and never hardcoded.
- Follow the principle of least privilege for all access controls and permissions.
- Maintain backward compatibility for public APIs unless major version bump is planned.