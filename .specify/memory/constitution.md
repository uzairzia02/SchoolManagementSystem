<!--
SYNC IMPACT REPORT
==================
Version Change: 1.1.0 → 1.2.0 (MINOR - added SaaS operational rules)
Modified Principles: None
Added Sections: SaaS Operational Rules (tenant isolation enforcement, audit logging system design, notification architecture, file storage policy, academic business rules, API versioning enforcement)
Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - needs constitution check alignment
  ✅ .specify/templates/spec-template.md - needs scope alignment
  ⚠ .specify/templates/tasks-template.md - pending review for principle-driven task types
  ⚠ .specify/templates/commands/sp.constitution.md - pending update for generic guidance
Deferred Items: None
-->

# School ERP / School Management System Constitution

## Version Information
**Version**: 1.2.0 | **Ratified**: 2026-06-23 | **Last Amended**: 2026-06-23

---

## Core Principles

### Multi-Tenant Architecture (MULTI_TENANT_ARCHITECTURE)
* Every entity must belong to a school
* All tables must include `schoolId` as a foreign key
* Cross-school data access is PROHIBITED except for Super Admin
* Reasoning: Enables SaaS scalability from 300–800 student schools to multi-school deployments
* Consequences: Architectural violation, code review rejection

### Security-First Development (SECURITY_FIRST_DEVELOPMENT)
* Zero‑trust model with defense in depth
* Input validation at every layer using Zod schemas
* AES‑256 encryption at rest and TLS 1.3 in transit
* CSRF protection, SQL‑injection prevention, rate limiting (100 req/min per user)
* Reasoning: Protects sensitive student/parent data per educational privacy regulations
* Consequences: Security audit failure, potential data breach

### Role-Based Access Control (RBAC) (ROLE_BASED_ACCESS_CONTROL)
* Roles: Super Admin, Principal, HR, Accountant, Teacher, Faculty, Student, Parent
* Each role defined with dashboard, permissions, navigation, and accessible pages
* Permission matrix enforced at API and UI layers
* Only Super Admin has cross‑school access
* Reasoning: Ensures proper data segregation and regulatory compliance
* Consequences: Unauthorized access, regulatory violations

### Clean Architecture (CLEAN_ARCHITECTURE)
* Separation of concerns with independent, testable modules
* Dependency rule: Frameworks → Application → Domain (inner circles must not depend on outer)
* Module structure: schema, types, hooks, utils, API layer per module
* Reasoning: Enables maintainability and testability for long‑term SaaS evolution
* Consequences: Tight coupling, untestable code, maintenance burden

### Modular Feature Design (MODULAR_FEATURE_DESIGN)
* Self‑contained modules (Authentication, Dashboard, Student/Parent Management, Attendance, Timetable, Exams, Fees, Reports, Settings, Audit Logs, etc.)
* No cross‑module imports without explicit contracts
* Reasoning: Supports concurrent development and future micro‑frontend migration
* Consequences: Development bottlenecks, merge conflicts

### Database Standards (DATABASE_STANDARDS)
* UUID v4 primary keys with cuid2 fallback
* Soft deletes using `deletedAt` timestamp
* Audit fields: `createdAt`, `updatedAt`, `createdBy`, `updatedBy`
* Indexes on all foreign keys and filter columns
* Reasoning: Ensures data integrity and audit‑trail compliance
* Consequences: Data corruption, audit‑trail gaps

### API Standards (API_STANDARDS)
* Structured responses: `{ success: boolean, data: T, error?: string }`
* Error format: `{ code: string, message: string, details?: any }`
* Mandatory Zod validation on all endpoints
* Pagination: `{ page, limit, total, hasNext }`
* Filtering/Sorting via whitelisted query parameters
* Rate limiting: 100 requests/minute per authenticated user
* Reasoning: Predictable API contract for frontend and third‑party integrations
* Consequences: Integration failures, client confusion

### UI Consistency & Design System (UI_CONSISTENCY)
* shadcn/ui components throughout
* Responsive breakpoints: sm (640 px), md (768 px), lg (1024 px), xl (1280 px)
* Dark mode via CSS variables
* Loading skeletons, empty states, error states
* Toast notifications for user actions
* Reasoning: Professional appearance suitable for international school brand
* Consequences: Inconsistent UX, brand degradation

### Accessibility (WCAG 2.1 AA) (ACCESSIBILITY)
* ARIA labels for all interactive elements
* Color contrast ≥ 4.5:1 for normal text
* Keyboard navigation for all critical functions
* Forms with proper labels and error messages
* Images with alt text
* Reasoning: Legal compliance with educational accessibility requirements
* Consequences: Legal liability, user exclusion

### Performance Requirements (PERFORMANCE)
* Server Components first; Client Components only when necessary
* Images: WebP with lazy loading and blur placeholders
* Pagination limit: max 50 items per page
* Database optimization: N+1 prevention, proper indexing
* Bundle analysis: ≤ 100 KB per page (First Paint)
* React Cache for server‑side data fetching
* Reasoning: Smooth experience with 300–800 concurrent users
* Consequences: Poor UX, increased operational costs

### TypeScript Strict Mode (TYPESCRIPT_STRICT)
* `strict: true` in `tsconfig.json`
* No `any` types allowed
* All API responses strongly typed via Zod inference
* Database models and schema definitions must align
* Generic constraints on reusable components
* Reasoning: Eliminates runtime type errors in multi‑tenant production
* Consequences: Runtime crashes, data corruption

### Testing Requirements (TESTING)
* Unit Tests: Vitest with ≥ 80 % coverage
* Integration Tests: API route testing with mocked database
* End‑to‑End Tests: Playwright for critical user flows
* Test files must accompany new features
* CI runs tests before merge
* Reasoning: Ensures quality for production SaaS deployment
* Consequences: Bugs in production, failed deployments

### Documentation Standards (DOCUMENTATION)
* All public functions with JSDoc comments
* API endpoints annotated with OpenAPI specs
* Database schemas documented with table/column comments
* README updated for each feature
* Reasoning: Facilitates knowledge transfer and maintenance
* Consequences: Knowledge silos, onboarding delays

### Git Workflow (GIT_WORKFLOW)
* Branch naming: `feature/`, `fix/`, `docs/`, `refactor/` prefixes
* Conventional commits: `type(scope): message`
* Pull requests required for all changes
* Minimum 1 reviewer for non‑breaking changes; 2 reviewers for breaking changes
* All CI checks must pass before merge
* Reasoning: Maintains clean history for audit and rollback
* Consequences: Merge conflicts, poor traceability

### Code Review Standards (CODE_REVIEW)
* Review must verify constitution compliance
* Security review for authentication/authorization changes
* Performance review for database/API changes
* TypeScript strictness verification
* Documentation completeness check
* Reasoning: Ensures architectural integrity and knowledge sharing
* Consequences: Technical debt, security vulnerabilities

### Versioning & Breaking Changes (VERSIONING)
* MAJOR.MINOR.PATCH semantic versioning
* Breaking changes require migration guide, deprecation notice (2 releases), ADR documentation
* API versioning via URL prefix `/api/v1/`
* Database migrations must be backward compatible
* Reasoning: Enables safe multi‑tenant deployments
* Consequences: Tenant disruption, migration failures

---

## Development Workflow

### Pre‑Development
1. Create feature branch from `main`
2. Review architecture against constitution principles
3. Create task breakdown with acceptance criteria

### Implementation
1. Follow modular feature design (no cross‑module imports)
2. Write tests before implementation (TDD)
3. Enforce TypeScript strict mode
4. Document all public APIs

### Review Process
1. Self‑review: run tests, check types, validate security
2. Peer review: verify constitution compliance
3. Merge only after all CI checks pass

### Deployment
1. Staging deployment for all PRs
2. Production deployment only from `main` after approval
3. Monitor logs and error rates post‑deployment

---

## Governance

### Amendment Procedure
1. Propose change via GitHub issue
2. Architectural review by senior engineers
3. Document in Architecture Decision Record (ADR)
4. Update constitution with change
5. Communicate to all developers

### Compliance Review
- Monthly: Constitution compliance audit via automated checks
- Quarterly: Architecture review meeting
- Annually: Full specification alignment review

### Violation Handling
- First offense: Warning + mandatory training
- Second offense: Blocked from merging
- Repeated offenses: Escalation to engineering leadership