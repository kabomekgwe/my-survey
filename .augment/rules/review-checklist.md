---
type: "manual"
description: "General code review checklist for all code changes"
---

# Code Review Checklist

## Functionality
- Code accomplishes the intended functionality as described in the ticket/PR description.
- Edge cases and error conditions are properly handled.
- No obvious bugs or logical errors are present.
- Code follows the single responsibility principle.

## Code Quality
- Code is readable and self-documenting with clear variable and function names.
- Complex logic is accompanied by explanatory comments.
- No code duplication without justification.
- Functions and classes are appropriately sized and focused.

## Testing
- All new code is covered by appropriate tests (unit, integration, or e2e).
- Existing tests still pass and are updated if necessary.
- Test cases cover both happy path and error scenarios.

## Performance
- No obvious performance bottlenecks or inefficient algorithms.
- Database queries are optimized and use appropriate indexes.
- Large datasets are handled efficiently with pagination or streaming.

## Security
- No hardcoded secrets, passwords, or sensitive information.
- Input validation and sanitization are properly implemented.
- Authentication and authorization checks are in place where needed.