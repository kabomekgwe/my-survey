---
mode: always
description: Non-negotiable org standards
type: "always_apply"
---
- Use TypeScript strict mode with no implicit any types.
- ESLint + Prettier configs in repo are source of truth; do not inline overrides.
- All code changes require unit tests; see @testing-strategy for detailed requirements.
- Use ULIDs for all new entity IDs (server + client) for global uniqueness and sortability.

## Cross-References
- See @coding-standards for detailed coding practices.
- See @testing-strategy for comprehensive testing requirements.
- See @security-policy for security-related standards.
- See @performance for performance optimization guidelines.
