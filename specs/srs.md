# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This SRS serves as the single source of truth for the School ERP SaaS system, derived from the PRD and the project constitution (v1.2.0).

### 1.2 Scope
The system enables schools to manage academic, HR, finance, and communication workflows across multiple tenants.

### 1.3 Definitions & Acronyms
- **SaaS** – Software-as-a-Service
- **RBAC** – Role-Based Access Control
- **API** – Application Programming Interface
- **DTO** – Data Transfer Object
- **SLO** – Service Level Objective

## 2. Overall Description

- **Product Perspective** – Stand-alone web application built on the Next.js stack; integrates with third-party email & storage services via REST.
- **User Classes** – See PRD persona table.
- **Operating Environment** – Vercel edge network, PostgreSQL (NeonDB) with Prisma, Node 18 runtime.
- **Design Constraints** – Must obey the constitution principles (multi-tenant, security-first, clean architecture, etc.).
- **Assumptions** – Users have modern browsers (Chrome/Firefox/Edge) and reliable internet.

## 3. Functional Requirements

| ID | Title | Description | Priority |
|----|-------|-------------|----------|
| FR-1 | Tenant Isolation | All data rows contain `schoolId`. Queries are automatically scoped. | Must |
| FR-2 | Authentication | Users log in via email/password or OAuth2; JWT stored in HttpOnly cookie. | Must |
| FR-3 | RBAC Enforcement | Every API checks role permissions; UI hides unauthorized actions. | Must |
| FR-4 | Student CRUD | Create, read, update, delete student records, bulk import CSV. | Must |
| FR-5 | Teacher Scheduling | Assign teachers to classes, detect conflicts. | Must |
| FR-6 | Attendance Capture | Mark present/absent, late, leave; generate monthly reports. | Must |
| FR-7 | Examination Workflow | Create exams, assign grades, compute GPA, export PDFs. | Must |
| FR-8 | Fee Management | Record fees, generate invoices, accept payments, apply discounts/fines. | Must |
| FR-9 | Notification Engine | Queue email & in-app notifications, respect user preferences. | Should |
| FR-10 | File Storage | Secure upload of documents; virus-scan, retention policy. | Should |
| FR-11 | Audit Logging | Immutable append-only table; each entry includes actorId, action, entity, timestamp. | Must |
| FR-12 | Public Website | SEO-optimized static pages (Home, About, Admissions, etc.). | Must |
| FR-13 | API Versioning | All endpoints prefixed with `/api/v1/`. | Must |
| FR-14 | Rate Limiting | 100 req/min/user; burst-cap 200 req/min. | Must |

## 4. Non-Functional Requirements

### 4.1 Performance
- **P-1**: API 95th-percentile latency ≤ 300ms.
- **P-2**: Page load ≤ 2s on 3G.

### 4.2 Security
- **S-1**: All traffic TLS 1.3.
- **S-2**: Passwords hashed with Argon2id.
- **S-3**: Input validation via Zod.
- **S-4**: CSRF protection via SameSite-Strict cookie.

### 4.3 Reliability
- **R-1**: 99.9% uptime SLA.
- **R-2**: Automated daily backups.

### 4.4 Maintainability
- **M-1**: Clean Architecture separation.
- **M-2**: ≥ 80% unit test coverage.

## 5. Data Dictionary (selected entities)

| Entity | Primary Key | Important Fields |
|--------|-------------|------------------|
| School | id (UUID) | name, address, createdAt |
| User | id (UUID) | email, role, schoolId, passwordHash |
| Student | id (UUID) | firstName, lastName, schoolId, classId |
| Teacher | id (UUID) | firstName, lastName, schoolId, departmentId |
| Attendance | id (UUID) | studentId, date, status, schoolId |
| Exam | id (UUID) | name, type, date, schoolId |
| Fee | id (UUID) | studentId, amount, status, dueDate |

## 6. Acceptance Criteria
- All FR items implemented with automated tests.
- Non-functional metrics met in staging.
- Documentation complete and versioned.