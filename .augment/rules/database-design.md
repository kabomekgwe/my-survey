---
type: "agent_requested"
description: "Database design principles and data modeling standards"
tags: [database, data-modeling, prisma, sql]
---

# Database Design Rules

## Schema Design Principles
- Use ULIDs for all primary keys to ensure global uniqueness and sortability.
- Implement proper foreign key constraints to maintain referential integrity.
- Use descriptive table and column names that clearly indicate their purpose.
- Follow consistent naming conventions: snake_case for tables/columns, singular table names.
- Include created_at and updated_at timestamps on all entities for audit trails.

## Data Modeling Standards
- Normalize data to eliminate redundancy while considering query performance.
- Use appropriate data types: avoid TEXT for known-length strings, use ENUM for fixed sets.
- Implement soft deletes with deleted_at columns for important business data.
- Use database-level constraints (NOT NULL, CHECK, UNIQUE) to enforce data integrity.
- Design for eventual consistency in distributed systems with proper conflict resolution.

## Prisma-Specific Guidelines
- Generate types from Prisma schema; never manually create database models.
- Use Prisma migrations for all schema changes with descriptive migration names.
- Implement proper relation definitions with explicit foreign key mappings.
- Use Prisma's built-in validation and transformation features where possible.
- Leverage Prisma's query optimization features and avoid N+1 query problems.

## Performance Optimization
- Create indexes for all foreign keys and frequently queried columns.
- Use composite indexes for multi-column queries and sort operations.
- Implement database connection pooling with appropriate pool sizes.
- Use read replicas for read-heavy workloads and separate reporting queries.
- Monitor query performance and optimize slow queries with EXPLAIN ANALYZE.

## Security and Access Control
- Implement row-level security (RLS) policies where supported and appropriate.
- Use database roles and permissions to limit access to sensitive data.
- Encrypt sensitive data at rest using database-level encryption features.
- Implement audit logging for all data modifications and access patterns.
- Use parameterized queries to prevent SQL injection attacks.

## Backup and Recovery
- Implement automated daily backups with point-in-time recovery capabilities.
- Test backup restoration procedures regularly to ensure data recoverability.
- Use database replication for high availability and disaster recovery.
- Document recovery procedures and maintain up-to-date runbooks.

## Cross-References
- See @backend-api for Prisma-specific implementation guidelines.
- See @security-policy for database security requirements.
- See @performance for database performance optimization.
- See @logging-monitoring for database monitoring and alerting.
- Monitor backup success and alert on backup failures immediately.
