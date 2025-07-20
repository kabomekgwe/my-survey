---
type: "manual"
---

# Documentation Rules

## Code Documentation
- All new or updated code must be documented with clear, concise, and up-to-date comments.
- Public methods, classes, and modules require comprehensive JSDoc comments with examples.
- Use TypeScript interfaces and types as documentation for data structures and API contracts.
- Document complex algorithms and business logic with inline comments explaining the "why".
- Include usage examples in documentation for non-trivial functions and APIs.

## API Documentation
- Whenever APIs or CLI entrypoints change, update related documentation in `README.md`, `/docs/`, or OpenAPI specs.
- Maintain up-to-date OpenAPI/Swagger specifications for all REST endpoints.
- Include request/response examples and error scenarios in API documentation.
- Document authentication requirements, rate limits, and usage guidelines.
- Use automated tools to generate API documentation from code annotations.

## Change Documentation
- For every significant change, summarize what changed and why in commit messages and PR descriptions.
- Include migration instructions for breaking changes with clear before/after examples.
- Keep changelogs (`CHANGELOG.md`) up to date with every release using conventional commit format.
- Document configuration changes and environment variable updates.
- Maintain architectural decision records (ADRs) for significant design decisions.

## Visual Documentation
- Add diagrams (Mermaid, PlantUML) to explain non-obvious workflows and complex interactions.
- Include sequence diagrams for API flows and system interactions.
- Use architecture diagrams to document system components and their relationships.
- Create user journey maps for complex workflows and business processes.
- All code snippets in documentation should be tested and valid for the current release.

## Cross-References
- See @api-design for API documentation standards.
- See @coding-standards for code comment requirements.
- See @pr-review-checklist for documentation review requirements.
