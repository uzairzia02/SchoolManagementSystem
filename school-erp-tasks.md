- [ ] T001 [P] Initialize git repository with conventional commits and branch protection
- [ ] T002 [P] Add .gitignore with standard ignores (node_modules, .env, build, .claude, history)
- [ ] T003 [P] Configure pre-commit hook with ESLint, Prettier, and lint-staged
- [ ] T004 [P] Add .editorconfig for indentation and line endings
- [ ] T005 [P] Add .env.example with environment variable placeholders
- [ ] T006 [P] Add CI pipeline skeleton (.github/workflows/ci.yml) with lint, test, build steps
- [ ] T007 [P] Add README.md with project overview and badges
- [ ] T008 [P] Add CONTRIBUTING.md with development guidelines
- [ ] T009 [P] Add ADR template (.specify/templates/adr-template.md)
- [ ] T010 [P] Create MEMORY.md for command reference
- [ ] T011 [P] Configure GitHub Actions workflows (lint, test, build, security)
- [ ] T012 [P] Set up branch protection rules for main branch
- [ ] T013 [P] Initialize design system documentation
- [ ] T014 [P] Create runbooks/ directory structure
- [ ] T015 [P] Configure documentation scaffolding (plans/, adr/, docs/)
- [ ] T016 [P] Validate tool availability (sp.plan, sp.phr, sp.adr)
- [ ] T017 [P] Test dry-run of plan generation
- [ ] T018 Validate initial setup completes CI pipeline successfully

## Phase 1 - Infrastructure & Multi-Tenant Foundations

### Epic: Multi-Tenant Foundation
- [ ] T101 [P] Provision NeonDB PostgreSQL instance (SSL-enabled)
- [ ] T102 [P] Configure NeonDB project and obtain connection string
- [ ] T103 [P] Create tenant_id column in User model
- [ ] T104 [P] Create tenant_id column in Student model
- [ ] T105 [P] Create tenant_id column in Teacher model
- [ ] T106 [P] Create tenant_id column in Fee model
- [ ] T107 [P] Create tenant_id column in Attendance model
- [ ] T108 [P] Create tenant_id column in Exam model
- [ ] T109 [P] Implement Row-Level Security (RLS) policies for tenant isolation
- [ ] T110 [P] Create tenant-middleware (src/middleware/tenant.ts) to inject schoolId
- [ ] T111 [P] Create tenant-scoped repository helpers (src/repositories/tenant.ts)
- [ ] T112 [P] Add tenant_id foreign key indexes on all tables
- [ ] T113 [P] Implement server-side tenant validation in every API route
- [ ] T114 [P] Add tenant-aware logging (include tenantId in logs)
- [ ] T115 [P] Implement multi-tenant data isolation in Prisma schema
- [ ] T116 [P] Create per-tenant upload directories (src/uploads/:schoolId/)
- [ ] T117 [P] Configure S3-compatible bucket (MinIO) for file storage
- [ ] T118 [P] Setup automated backup schedule (daily snapshots, retention policy)
- [ ] T119 [P] Configure encrypted backups (AES-256) for all tenant data stores
- [ ] T120 [P] Set up rate limiting middleware (100 req/min per tenant)
- [ ] T121 [P] Add CSP headers via Next.js Headers config
- [ ] T122 [P] Add HTTP security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] T123 [P] Validate tenant isolation with automated test suite
- [ ] T124 [P] Configure environment variables (NEXT_PUBLIC_…, DATABASE_URL, etc.) via .env files
- [ ] T125 [P] Add secret rotation schedule (quarterly)
- [ ] T126 [P] Add secret scanning job (truffle-hunter)
- [ ] T127 [P] Add secret detection pre-push hook
- [ ] T128 [P] Validate multi-tenant isolation with penetration test scenarios

## Phase 2 - Authentication & RBAC

### Epic: Authentication Core
- [ ] T201 [P] Install and configure NextAuth.js with Next.js App Router
- [ ] T202 [P] Configure JWT session strategy with refresh token rotation
- [ ] T203 [P] Implement OAuth2 flows for Google provider
- [ ] T204 [P] Implement OAuth2 flows for Microsoft provider
- [ ] T205 [P] Configure password hashing with Argon2id (bcrypt fallback)
- [ ] T206 [P] Add password reset flow scaffolding (routes and UI)
- [ ] T207 [P] Add MFA (TOTP) scaffolding (future feature)
- [ ] T208 [P] Set up HttpOnly, Secure, SameSite-Strict cookie flags
- [ ] T209 [P] Add login UI components (login.tsx, SSO buttons)
- [ ] T210 [P] Add logout flow (POST /api/v1/auth/logout)
- [ ] T211 [P] Add password reset request flow (future)
- [ ] T212 [P] Add password reset password-reset.tsx (future)
- [ ] T213 [P] Add password change flow (future)
- [ ] T214 [P] Add unit tests for password validation rules
- [ ] T215 [P] Enforce rate limiting on auth endpoints (5 attempts / 15 min)
- [ ] T216 [P] Add CSP headers via Next.js Headers config
- [ ] T217 [P] Add security headers (Referrer-Policy, X-XSS-Protection)
- [ ] T218 [P] Validate password never logged; hashed with Argon2id
- [ ] T219 [P] Add secure cookie flags (HttpOnly, Secure, SameSite=Strict)
- [ ] T220 [P] Implement CSRF protection via SameSite-Strict
- [ ] T221 [P] Add rate-limit for auth endpoints (100 req/min per user)

### Epic: RBAC Implementation
- [ ] T222 [P] Add RBAC role constants (SUPER_ADMIN, PRINCIPAL, HR, ACCOUNTANT, TEACHER, FACULTY, STUDENT, PARENT)
- [ ] T223 [P] Create RBAC permission matrix (src/security/rbac.ts)
- [ ] T224 [P] Implement role-based route protection middleware
- [ ] T225 [P] Add UI role-based component guards (<RoleGuard>)
- [ ] T226 [P] Add unit tests for role permission evaluation
- [ ] T227 [P] Run audit script to verify no missing permissions
- [ ] T228 [P] Pen-test permission bypass scenarios
- [ ] T229 [P] Add role-based UI rendering guards

## Phase 3 - Core Schema & Shared Services

### Epic: Database Schema
- [ ] T301 [P] Create Prisma schema files (schema.prisma) with all models
- [ ] T302 [P] Implement all database models and relationships
- [ ] T303 [P] Add soft-delete fields (deletedAt) to all core entities
- [ ] T304 [P] Add audit fields (createdAt, updatedAt, createdBy, updatedBy) to all core tables
- [ ] T305 [P] Add foreign key relationships and foreign key indexes
- [ ] T306 [P] Apply tenant-wide indexing strategy
- [ ] T307 [P] Create audit log service (append-only logs with immutable storage)
- [ ] T308 [P] Implement notification service abstraction (email, SMS, in-app)
- [ ] T309 [P] Build file storage service (S3 integration, signed URLs, virus scan)
- [ ] T310 [P] Create PDF generation service (pdf-lib or puppeteer)
- [ ] T311 [P] Create CSV export utility for reports
- [ ] T312 [P] Implement error handling middleware (global error handler)
- [ ] T313 [P] Add request-ID middleware (correlation IDs)
- [ ] T314 [P] Add performance tracing middleware (response time, DB query time)
- [ ] T315 [P] Add centralized logging (Winston) with JSON format
- [ ] T316 [P] Add access logging with request ID
- [ ] T317 [P] Add correlation ID propagation across services
- [ ] T318 [P] Create shared utility library (date, currency, date-format, etc.)
- [ ] T319 [P] Add TypeScript global types and interfaces
- [ ] T320 [P] Add global error type definitions
- [ ] T321 [P] Add environment variable validation (zod validation)
- [ ] T322 [P] Add lint-staged config for pre-commit hooks
- [ ] T323 [P] Add commit-msg linting hook
- [ ] T324 [P] Create shared validation utilities using Zod schemas per endpoint
- [ ] T325 [P] Add unit tests for shared services

## Phase 4 - Core Business Modules

### Module: Admission Management
- [ ] T401 [US1] Create AdmissionApplication model in Prisma schema
- [ ] T402 [US1] Add Document model for admission uploads
- [ ] T403 [US1] Create admission-form.tsx (React component)
- [ ] T404 [US1] Implement form validation using Zod schema
- [ ] T405 [US1] Add API route POST /api/v1/admissions/applications
- [ ] T406 [US1] Create admission service with business logic
- [ ] T407 [US1] Add document upload handling (file upload API)
- [ ] T408 [US1] Implement email confirmation workflow (SendGrid)
- [ ] T409 [US1] Add admission status tracking (PENDING, VERIFIED, REJECTED)
- [ ] T410 [US1] Create admissions dashboard component
- [ ] T411 [US1] Add unit tests for admission validation logic
- [ ] T412 [US1] Write integration tests for full admission flow
- [ ] T413 [US1] Add audit logging for each admission action
- [ ] T414 [US1] Add bulk import feature for batch applications
- [ ] T415 [US1] Add API endpoint to query admission status
- [ ] T416 [US1] Add email notifications for status changes
- [ ] T417 [US1] Add role-based UI visibility (admin vs. teacher)
- [ ] T418 [US1] Add admission reports API endpoint
- [ ] T419 [US1] Add unit tests for admission validation rules
- [ ] T420 [US1] Add integration tests for admission workflow

### Module: Teacher Management
- [ ] T501 [US3] Create Teacher model in Prisma (userId, departmentId, hireDate)
- [ ] T502 [US3] Add teacher-to-department junction table
- [ ] T503 [US3] Implement teacher CRUD API endpoints (/api/v1/teachers)
- [ ] T504 [US3] Add department management endpoint
- [ ] T505 [US3] Create teacher profile page UI
- [ ] T506 [US3] Implement teacher assignment service
- [ ] T507 [US3] Add teacher availability calendar
- [ ] T508 [US3] Create teacher reporting dashboard
- [ ] T509 [US3] Add performance evaluation features
- [ ] T510 [US3] Create teacher UI components
- [ ] T511 [US3] Add unit tests for teacher model
- [ ] T512 [US3] Write integration tests for teacher workflow
- [ ] T513 [US3] Add role-based access controls
- [ ] T514 [US3] Implement audit logging

### Module: Parent Management
- [ ] T601 [US4] Create Parent model and relationship to Student
- [ ] T602 [US4] Implement parent-portal login flow
- [ ] T603 [US4] Build parent dashboard UI (student list, attendance, fees)
- [ ] T604 [US4] Implement student-linking workflow
- [ ] T605 [US4] Add parent notification preferences UI
- [ ] T606 [US4] Add emergency contact management
- [ ] T607 [US4] Create parent document upload feature
- [ ] T608 [US4] Add unit tests for parent API endpoints
- [ ] T609 [US4] Write integration tests for parent flow
- [ ] T610 [US4] Add role-based access controls
- [ ] T611 [US4] Implement audit logging
- [ ] T612 [US4] Add password reset for parents
- [ ] T613 [US4] Create parent onboarding workflow

### Module: Attendance Management
- [ ] T701 [US5] Create Attendance model with studentId, date, status, teacherId
- [ ] T702 [US5] Build daily attendance entry API
- [ ] T703 [US5] Implement bulk attendance entry endpoint (batch upload)
- [ ] T704 [US5] Add attendance validation (status enum)
- [ ] T705 [US5] Add authentication guard for attendance API
- [ ] T706 [US5] Create attendance dashboard component (React)
- [ ] T707 [US5] Implement bulk attendance entry Excel upload
- [ ] T708 [US5] Add attendance reports generation API (PDF/CSV)
- [ ] T709 [US5] Add late arrival processing service
- [ ] T710 [US5] Implement leave management API
- [ ] T711 [US5] Add attendance analytics dashboard
- [ ] T712 [US5] Add unit tests for bulk attendance import
- [ ] T713 [US5] Write integration tests for attendance flows
- [ ] T714 [US5] Add role-based access controls
- [ ] T715 [US5] Implement audit logging
- [ ] T716 [US5] Add unit tests for validation rules
- [ ] T717 [US5] Add unit tests for status transition logic
- [ ] T718 [US5] Create attendance UI components
- [ ] T719 [US5] Add mobile responsive attendance view
- [ ] T720 [US5] Add parent notification for absences

### Module: Timetable Management
- [ ] T801 [US6] Create Timetable model (scheduling data)
- [ ] T802 [US6] Implement timetable API endpoints (/api/v1/timetable)
- [ ] T803 [US6] Add conflict detection service
- [ ] T804 [US6] Create classroom allocation service
- [ ] T805 [US6] Implement drag-and-drop UI for scheduling
- [ ] T806 [US6] Add teacher availability scheduler
- [ ] T807 [US6] Create timetable export functionality
- [ ] T808 [US6] Add student timetable viewer
- [ ] T809 [US6] Add unit tests for scheduling logic
- [ ] T810 [US6] Write integration tests for timetable flows
- [ ] T811 [US6] Add role-based access controls
- [ ] T812 [US6] Implement audit logging
- [ ] T813 [US6] Add timetable conflict validation
- [ ] T814 [US6] Create timetable management UI

### Module: Examination Management
- [ ] T901 [US7] Create Exam model (examId, title, date, examType)
- [ ] T902 [US7] Implement exam creation API (/api/v1/exams)
- [ ] T903 [US7] Add exam scheduling service
- [ ] T904 [US7] Implement result processing system
- [ ] T905 [US7] Create exam result entry interface
- [ ] T906 [US7] Add result publishing endpoint (/api/v1/exams/:id/grades)
- [ ] T907 [US7] Build printable report (PDF) generation
- [ ] T908 [US7] Add student self-service result viewer
- [ ] T909 [US7] Add grade curving and scaling logic
- [ ] T910 [US7] Add unit tests for exam logic
- [ ] T911 [US7] Write integration tests for result processing
- [ ] T912 [US7] Add role-based access controls
- [ ] T913 [US7] Implement audit logging
- [ ] T914 [US7] Add exam security measures (sandbox iframe, CSP restrictions)
- [ ] T915 [US7] Create exam administration UI

### Module: Grading System
- [ ] T1001 [US9] Create Grade model (studentId, examId, grade, weight)
- [ ] T1002 [US9] Implement grade calculation engine
- [ ] T1003 [US9] Add GPA computation service
- [ ] T1004 [US9] Build report-card generation pipeline (PDF)
- [ ] T1005 [US9] Create transcript generation endpoint
- [ ] T1006 [US9] Add student grades viewer component
- [ ] T1007 [US9] Implement grade-appeal workflow UI
- [ ] T1008 [US9] Add grade validation service
- [ ] T1009 [US9] Add unit tests for grade calculation
- [ ] T1010 [US9] Write integration tests for grading workflow
- [] T1011 [US9] Add role-based access controls
- [ ] T1012 [US9] Implement audit logging
- [ ] T1013 [US9] Add GPA algorithm unit tests
- [ ] T1014 [US9] Create grading dashboard UI

### Module: Fee Management
- [ ] T1101 [US10] Create FeeStructure model (feeType, amount, dueDay, isRecurring)
- [ ] T1102 [US10] Implement fee structure CRUD API
- [ ] T1103 [US10] Build invoice generation endpoint (/api/v1/fees/invoices)
- [ ] T1104 [US10] Add payment recording endpoint (/api/v1/fees/payments)
- [ ] T1105 [US10] Implement receipt generation (PDF)
- [ ] T1106 [US10] Add discount/scholarship application service
- [ ] T1107 [US10] Create fee-status tracking (Pending, Paid, Overdue)
- [ ] T1108 [US10] Implement partial payment handling
- [ ] T1109 [US10] Add late-fee calculation (dailyRate * overdueDays, capped at 10%)
- [ ] T1110 [US10] Add fee-payment reminders (email/SMS)
- [ ] T1111 [US10] Create fee-status dashboard UI
- [ ] T1112 [US10] Add unit tests for fee calculations
- [ ] T1113 [US10] Write integration tests for fee workflows
- [ ] T1114 [US10] Add role-based access controls
- [ ] T1115 [US10] Implement audit logging
- [ ] T1116 [US10] Add Stripe/Paystack integration
- [ ] T1117 [US10] Create payment gateway webhook handlers
- [ ] T1118 [US10] Add idempotency key handling for payments
- [ ] T1119 [US10] Create fee management UI components
- [ ] T1120 [US10] Add financial reports API

### Module: HR Management
- [ ] T1201 [US11] Create Employee model in Prisma schema
- [ ] T1202 [US11] Implement employee management API (/api/v1/employees)
- [ ] T1203 [US11] Add payroll processing endpoint
- [ ] T1204 [US11] Implement leave management API
- [ ] T1205 [US11] Create performance tracking features
- [ ] T1206 [US11] Add employee profile page UI
- [ ] T1207 [US11] Implement salary structure management
- [ ] T1208 [US11] Add allowance and deduction handling
- [ ] T1209 [US11] Create payroll generation service
- [ ] T1210 [US11] Add unit tests for HR models
- [ ] T1211 [US11] Write integration tests for HR workflows
- [ ] T1212 [US11] Add role-based access controls
- [ ] T1213 [US11] Implement audit logging

### Module: Notification System
- [ ] T1301 [P] Implement email template library (HTML + variables)
- [ ] T1302 [P] Configure SendGrid integration (API key, templates)
- [ ] T1303 [P] Implement SMS sending queue (Twilio)
- [ ] T1304 [P] Add rate limiting for notification dispatch
- [ ] T1305 [P] Add notification template placeholders ({{studentName}})
- [ ] T1306 [P] Add fallback to in-app toast notifications
- [ ] T1307 [P] Add notification preference storage (user settings)
- [ ] T1308 [P] Create notification preference UI (parent portal)
- [ ] T1309 [P] Add webhook endpoint for payment confirmation
- [ ] T1310 [P] Implement idempotency key handling for payment callbacks
- [ ] T1311 [P] Add rate-limit for notification dispatch (max 10 per hour)
- [ ] T1312 [P] Add notification delivery tracking

### Module: File Storage System
- [ ] T1401 [P] Implement file upload API endpoint
- [ ] T1402 [P] Create signed URL generation service
- [ ] T1403 [P] Add virus scanning integration
- [ ] T1404 [P] Implement file management UI
- [ ] T1405 [P] Add retention policy enforcement
- [ ] T1406 [P] Create file download endpoint
- [ ] T1407 [P] Add file deletion (soft delete) service
- [ ] T1408 [P] Implement file version tracking

### Module: Audit Log System
- [ ] T1501 [P] Create audit log API endpoint
- [ ] T1502 [P] Implement search functionality
- [ ] T1503 [P] Build export capabilities
- [ ] T1504 [P] Add audit dashboard UI
- [ ] T1505 [P] Implement immutable log storage
- [ ] T1506 [P] Add log retention policy (2 years)
- [ ] T1507 [P] Create audit log repository

### Module: Reporting System
- [ ] T1601 [P] Build report engine (aggregate data from all modules)
- [ ] T1602 [P] Create PDF export service (using pdf-lib)
- [ ] T1603 [P] Add CSV export for financial reports
- [ ] T1604 [P] Implement report scheduling (daily, weekly, monthly)
- [ ] T1605 [P] Add subscription-based report delivery
- [ ] T1606 [P] Build admin UI for report selection
- [ ] T1607 [P] Add report filters (date range, school, fee type)
- [ ] T1608 [P] Create export to Excel function
- [ ] T1609 [P] Add subscription export to CSV
- [ ] T1610 [P] Add charting library (Recharts) for visualizations
- [ ] T1611 [P] Implement drill-down capability from summary to detail view
- [ ] T1612 [P] Add report template versioning

### Module: Public Website
- [ ] T1701 [P] Create home page (src/app/page.tsx)
- [ ] T1702 [P] Build about page
- [ ] T1703 [P] Implement admissions page
- [ ] T1704 [P] Create news/events pages
- [ ] T1705 [P] Build contact page
- [ ] T1706 [P] Add SEO optimization
- [ ] T1707 [P] Create CMS-ready architecture
- [ ] T1708 [P] Add inquiry forms
- [ ] T1709 [P] Implement site navigation
- [ ] T1710 [P] Add footer with quick links
- [ ] T1711 [P] Create responsive design
- [ ] T1712 [P] Add accessibility features (WCAG 2.1 AA)

## Phase 5 - Integrations & External Services

### Epic: Payment Integration
- [ ] T1801 [P] Integrate Stripe payment gateway (payment intent, webhook)
- [ ] T1802 [P] Implement PayStack sandbox integration (regional payments)
- [ ] T1803 [P] Build webhook verification and retry logic
- [ ] T1804 [P] Add idempotency key handling for payment callbacks
- [ ] T1805 [P] Create payment status webhook endpoint
- [ ] T1806 [P] Add payment confirmation email/SMS
- [ ] T1807 [P] Implement transaction logging

### Epic: Communication Integration
- [ ] T1901 [P] Integrate Google Calendar sync for exam dates
- [ ] T1902 [P] Add Outlook Calendar sync for exam dates
- [ ] T1903 [P] Create ICS export endpoint (/api/v1/calendar/export)
- [ ] T1904 [P] Add Azure Key Vault for secret storage
- [ ] T1905 [P] Implement retry logic with exponential backoff for external services
- [ ] T1906 [P] Add circuit-breaker pattern for integrations
- [ ] T1907 [P] Add environment variable validation (missing config throws error)
- [ ] T1908 [P] Create API documentation generation (Swagger UI)

## Phase 6 - Testing & Quality Assurance

### Epic: Unit Testing
- [ ] T2001 Write unit tests for authentication middleware
- [ ] T2002 Write unit tests for fee calculation logic
- [ ] T2003 Write unit tests for fee generation and reconciliation
- [ ] T2004 Write unit tests for fee webhook handlers
- [ ] T2005 Add coverage enforcement in CI (>=80%)

### Epic: Integration Testing
- [ ] T2101 Write integration tests for end-to-end flows (login → fee payment → receipt)
- [ ] T2102 Add Playwright tests for critical UI flows (login → fee payment → receipt download)
- [ ] T2103 Write e2e test for fee payment flow

### Epic: Security Testing
- [ ] T2201 Run OWASP ZAP security scan (baseline)
- [ ] T2202 Add coverage for OWASP top-10 findings
- [ ] T2203 Add secret detection scan (git-secret-scan)
- [ ] T2204 Run security audit (npm audit, npm audit fix, dependency verification)
- [ ] T2205 Run dependency-vulnerability check (npm audit, Snyk) and fix findings

### Epic: Performance Testing
- [ ] T2301 Run performance load testing (k6) targeting 200 concurrent users
- [ ] T2302 Verify p95 response time < 300 ms for fee endpoints
- [ ] T2303 Verify p95 latency < 200 ms for authentication endpoints
- [ ] T2304 Verify rate limiting works (burst >100 req/min blocked)
- [ ] T2305 Verify multi-tenant data isolation via automated test (query as tenant A, verify cannot read tenant B data)

### Epic: CI/CD Testing
- [ ] T2401 Add CI/CD pipeline for fee module builds
- [ ] T2402 Add test automation in deployment pipeline
- [ ] T2403 Add build validation

## Phase 7 - CI/CD & Deployment Pipeline

### Epic: GitHub Actions
- [ ] T2501 Configure GitHub Actions workflows (build, test, lint, deploy)
- [ ] T2502 Add cache steps for node_modules and node_modules
- [ ] T2503 Configure manual approval gate for production deployment
- [ ] T2504 Add blue-green deployment script (blue-green-deployment.ts)
- [ ] T2505 Add canary deployment script (5% traffic)
- [ ] T2506 Add automated rollback on failed health checks
- [ ] T2507 Add environment-specific config files (production.env, staging.env)
- [ ] T2508 Configure environment variables via AWS Secrets Manager
- [ ] T2509 Add deployment scripts (npm run deploy:staging, deploy:prod)

### Epic: Monitoring & Observability
- [ ] T2601 Set up monitoring (Prometheus + Grafana) with alerts for CPU, memory, error rates
- [ ] T2602 Add health-check endpoint (/health) with JSON response
- [ ] T2603 Set up Sentry error tracking integration
- [ ] T2604 Configure API gateway rate limiting (cloud-flare or internal)
- [ ] T2605 Add deployment documentation (README-deploy.md)

## Phase 8 - Compliance & Release

### Epic: Final Verification
- [ ] T2701 Run final Constitution audit (checklist validation)
- [ ] T2702 Run final security penetration test (external vendor if possible)
- [ ] T2703 Update ADRs with final architectural decisions
- [ ] T2704 Generate final API documentation (Swagger UI) and host on docs site
- [ ] T2705 Add user-guide for administrators (report generation, fee scheduling)
- [ ] T2706 Conduct stakeholder sign-off meeting (record minutes)
- [ ] T2707 Finalize production launch checklist (backup verification, CDN purge, CDN cache bust)
- [ ] T2708 Go live – switch DNS to production domain
- [ ] T2709 Verify DNS propagation and SSL certificates
- [ ] T2710 Activate monitoring alerts (Sentry, Datadog)
- [ ] T2711 Deploy hot-fix rollback plan verification
- [ ] T2712 Conduct post-launch retrospective (lessons learned)