# Product Requirements Document (PRD)

## 1. Vision
Create a **modern, enterprise-grade, multi-tenant School ERP SaaS** that serves a single medium-sized school out-of-the-box and can be spun-up for unlimited schools with minimal re-configuration.

## 2. Goals
| # | Goal | Success Metric |
|---|------|----------------|
| 1 | Deliver a flagship portfolio project | Positive press & case study |
| 2 | Build a production-ready SaaS foundation | 99.9% uptime SLA, 95% customer satisfaction |
| 3 | Enforce enterprise engineering standards | 0 critical security findings, 80% test coverage |
| 4 | Enable rapid onboarding of new schools | New tenant activation ≤ 30 min |
| 5 | Maintain long-term maintainability | ≤ 5% code churn per quarter |

## 3. Scope
- **In-Scope**: All core school operations (student, teacher, parent, HR, finance, attendance, exams, reporting) plus a public marketing website.
- **Out-of-Scope**: On-premise deployment, custom third-party integrations beyond standard webhooks, AI-assisted tutoring.

## 4. Stakeholders
| Role | Responsibility |
|------|----------------|
| Product Owner | Prioritize features, define success criteria |
| CTO / Lead Architect | Enforce constitution, approve ADRs |
| School Admin (Customer) | Provide domain knowledge, validate UX |
| Developers | Implement per specs |
| QA Lead | Validate test coverage, release gate |
| Security Officer | Review threat model, approve audit logs |

## 5. User Personas
| Persona | Primary Needs |
|---------|---------------|
| **Super Admin** | Manage multiple schools, view cross-school analytics |
| **Principal** | Dashboard of school performance, approve budgets |
| **Teacher** | Create grades, assignments, view timetables |
| **Parent** | View child attendance, fees, receive notifications |
| **Student** | Access coursework, submit assignments, view results |
| **HR / Accountant** | Manage staff records, payroll, invoices |

## 6. Functional Requirements
1. **Multi-Tenant Isolation** – Every record is scoped by `schoolId`. Super Admin can query across schools.
2. **Role-Based Access Control** – Eight roles with fine-grained permissions.
3. **Authentication** – Password-based login with optional SSO (OAuth2) via NextAuth.
4. **Student Management** – CRUD for students, enrollment, guardians.
5. **Teacher Management** – Profiles, class assignments, availability.
6. **Attendance** – Daily/period attendance, late-arrival flags, leave status, monthly reports.
7. **Timetable & Scheduling** – Drag-and-drop UI, conflict detection.
8. **Examination Workflow** – Mid-term, final, quiz, assignment grading, GPA calculation, merit lists, PDF report cards.
9. **Fee Management** – Admission, monthly, annual, transport, discounts, fines; payment receipt generation.
10. **Reporting & Analytics** – Exportable PDFs, charts, KPI dashboards.
11. **Notification System** – Email + in-app push for events, fees, announcements.
12. **File Storage** – Secure upload of documents (photos, reports) with virus scanning.
13. **Audit Logging** – Immutable logs of critical actions, searchable UI.

## 7. Non-Functional Requirements
- **Scalability** – Horizontal scaling on Vercel; DB sharding per `schoolId` optional.
- **Performance** – Page ≤ 2s on 3G, API ≤ 300ms p95.
- **Security** – Zero-trust, OWASP Top 10 compliance, GDPR-compatible data retention.
- **Reliability** – 99.9% SLA, automated backups, failover.
- **Maintainability** – Clean Architecture, 80% unit test coverage, semantic versioning.

## 8. Acceptance Criteria
- All functional modules functional in a sandbox tenant.
- End-to-end tests covering primary user journeys pass on CI.
- Security audit (SAST + DAST) yields no critical findings.
- Documentation (API, UI, deployment) is complete and versioned.

## 9. Constraints
- Must run on PostgreSQL (NeonDB) with Prisma ORM.
- Front-end must use Next.js 13 App Router, TypeScript, Tailwind, shadcn/ui.
- All external services (email, storage) must provide RESTful APIs.

## 10. Success Metrics
- **Adoption** – ≥ 3 pilot schools within 6 months.
- **Retention** – ≤ 5% churn after first year.
- **Performance** – 95% of API calls ≤ 300ms.
- **Security** – Zero data-leak incidents over 12 months.