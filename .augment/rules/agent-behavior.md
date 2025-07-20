---
type: "manual"
---

# Agent Behavior Rules

## File System Operations
- The AI agent must always request approval before making permanent file system modifications, unless in auto-accept mode.
- Never modify, delete, or rename files in protected directories (`plans/`, `memory-bank/`) without explicit instruction.
- Always favor reading and suggesting updates to existing code rather than duplicating logic in new files.
- Use appropriate tools for file operations and avoid shell commands for file manipulation when possible.
- Verify file paths and permissions before making changes to prevent accidental modifications.

## Version Control and Branching
- The agent is NOT allowed to commit or push to `main` or protected branches without explicit permission.
- All code changes must be made on feature branches using pattern: `feature/<issue-key>-<short-description>-<date>`.
- Use conventional commit messages with proper prefixes (feat:, fix:, docs:, etc.).
- Always check current branch and repository status before making commits.
- Request permission before performing destructive git operations (rebase, force push, etc.).

## Command Execution Safety
- When executing shell or terminal commands, ensure correct working directory with `cd <target_dir> &&` prefix.
- Validate command syntax and potential side effects before execution.
- Use appropriate timeouts for long-running commands and provide progress updates.
- Handle command failures gracefully and provide clear error messages and recovery suggestions.
- Avoid commands that could affect system stability or security.

## Documentation and Communication
- For each user request, log actions taken and explain design decisions in PR or commit messages.
- Provide clear explanations for code changes and their impact on the system.
- If an operation fails or produces an error, immediately report the failure and suggest recovery paths.
- Use structured markdown for documentation and maintain consistent formatting.
- Include relevant context and reasoning for decisions made during implementation.

## Cross-References
- See @project-guidelines for branching and commit conventions.
- See @security-policy for security considerations in agent operations.
- See @deployment-cicd for CI/CD integration requirements.

