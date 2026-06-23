---
name: school-erp-constitution
description: Project constitution for multi-tenant school ERP system
---

## Core Principles

### Scalable Architecture (scalable-architecture)
- Implements multi-tenancy through schoolId prefixing
- No backend/store-specific assumptions allowed
- Cross-cutting concerns must be abstracted
- Enables seamless scaling across 300-800 student schools

### Security-First Design (security-first-design)
- Zero assumptions about data trust
- All user data encrypted at rest and in transit
- Input validation enforced at every layer
- Complies with educational data protection regulations

### Modular Development (modular-development)
- Each module independently testable
- Shared contracts enforced via Zod
- No "god files"
- Supports concurrent development without conflicts

### Clean Data Modeling (clean-data-modeling)
- PostgreSQL schema must normalize relationships
- Mandatory timestamps (createdAt/updatedAt)
- Soft deletes for sensitive records
- Prevents audit log data corruption

### TypeScript Enforcement (typescript-enforcement)
- All API responses strongly-typed
- Database models align with schema definitions
- No "any" types allowed
- Reduces deployment errors in multi-tenant systems

### Accessibility Mandate (accessibility-mandate)
- UI must pass WCAG 2.1 AA standards
- Critical functions (forms, payments) must be keyboard navigable
- Complies with educational institution accessibility laws

## Development Workflow

- All code changes require UUID-based versioning
- PR reviews validate constitutional compliance
- Breaking changes require ADR documentation

## Governance

- Ratified: 2026-06-23
- Last Amended: 2026-06-23
- Version: 1.0.0
- Amendments require documented impact analysis and backward compatibility plan

**Version**: 1.0.0 | **Ratified**: 2026-06-23 | **Last Amended**: 2026-06-23