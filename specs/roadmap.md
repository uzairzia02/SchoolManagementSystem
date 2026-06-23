# Product Roadmap

## 1. Phased Approach
The project is executed in incremental, delivery-focused phases. Each phase delivers tangible value to stakeholders and can be released independently.

### Phase 1: Core Academic Operations (Q1–Q2)
**Goal**: Enable day-to-day school operations.
- **Modules**:
  - Authentication & Authorization
  - Student Management
  - Teacher Management
  - Attendance
  - Timetable
- **Deliverables**:
  - Multi-tenant SaaS foundation
  - Role‑based access (Super Admin, Principal, Teacher)
  - Student/Teacher CRUD
  - Daily attendance capture
  - Timetable builder
  - Public website skeleton

### Phase 2: Academic Assessment (Q3)
**Goal**: Enable evaluation and reporting.
- **Modules**:
  - Examination & Grading
  - Report Cards
  - Fee Management (basic)
- **Deliverables**:
  - Exam creation & submission
  - Grading & GPA calculation
  - PDF report cards
  - Fee invoicing & payment tracking
  - Basic analytics dashboard

### Phase 3: HR & Administration (Q4)
**Goal**: Support school administration & staff management.
- **Modules**:
  - HR Management
  - Parent Portal
  - Notification System
  - File Storage & Audit Logs
- **Deliverables**:
  - Employee directory & contracts
  - Parent/Student portal views
  - Email & in‑app notifications
  - Secure document upload
  - Immutable audit logging
  - Advanced analytics (KPIs)

### Phase 4: Advanced Features & Optimization (Q1–Q2 Next Year)
**Goal**: Enhance usability, performance, and scalability.
- **Modules**:
  - Advanced Reporting
  - Mobile App (PWA)
  - AI-Assisted Grading (stub)
  - Marketplace for Add‑ons
- **Deliverables**:
  - Performance optimizations (caching, DB tuning)
  - Custom role creation per tenant
  - API rate‑limiting & quotas
  - GDPR compliance toolkit
  - Internationalization (i18n) framework

## 2. Release Cadence
- **Sprint**: 2 weeks
- **Release**: Every 4 weeks (two sprints) to staging; promotion to production monthly.
- **Hotfix**: Deployed as needed via cherry-pick to `main`.

## 3. Dependencies Between Phases
- Phase 2 requires Phase 1 student/teacher data.
- Phase 3 requires Phase 1 staff data.
- Phase 4 requires all previous phases stable.

## 4. Success Metrics per Phase
| Phase | Success Metric |
|-------|----------------|
| Phase 1 | ≥ 3 pilot schools onboarding, attendance capture ≥ 95% accuracy |
| Phase 2 | Exam creation → grading ≤ 2 min per student, report cards generated |
| Phase 3 | Parent portal adoption ≥ 80%, fee collection rate ≥ 90% |
| Phase 4 | API p95 latency ≤ 200 ms, zero critical vulnerabilities in scan |