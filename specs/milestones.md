# Milestones

## 1. Milestone Overview
Each milestone represents a tangible, verifiable deliverable with acceptance criteria.

| Milestone | Phase | Target Date | Description |
|-----------|-------|-------------|-------------|
| M1 – Project Setup & CI/CD | 0 | Week 2 | Repo initialized, CI pipeline green, Vercel preview deploys |
| M2 – Auth & RBAC Core | 1 | Week 4 | NextAuth login, 8 roles enforced, tenant middleware works |
| M3 – Student/Teacher CRUD | 1 | Week 6 | Admin creates, edits, lists students & teachers; audit logs recorded |
| M4 – Attendance Capture | 1 | Week 8 | Teacher marks attendance, monthly report generated |
| M5 – Timetable Builder | 1 | Week 10 | Drag‑and‑drop timetable with conflict detection |
| M6 – Phase 1 Internal Demo | 1 | Week 11 | All Phase 1 modules integrated, demo to stakeholders |
| M7 – Exam & Grading Engine | 2 | Week 14 | Create exam, student submits, teacher grades, report card PDF |
| M8 – Fee Management MVP | 2 | Week 16 | Invoice creation, payment recording, receipt download |
| M9 – Phase 2 Demo & QA | 2 | Week 17 | Full Phase 2 flow passes E2E tests |
| M10 – HR & Payroll Stub | 3 | Week 20 | Employee directory, contract, leave, basic payroll export |
| M11 – Parent/Student Portal | 3 | Week 22 | Parents view child data, pay fees, receive notifications |
| M12 – Notification & File System | 3 | Week 24 | Email + in‑app notifications, virus‑scanned uploads |
| M13 – Audit Log & Compliance | 3 | Week 25 | Immutable audit trail, GDPR export, retention policies |
| M14 – Phase 3 Demo & Security Audit | 3 | Week 26 | External pen‑test, security sign‑off |
| M15 – Performance Optimization | 4 | Week 29 | Caching layer, bundle ≤ 100 KB, p95 latency < 300 ms |
| M16 – PWA & Mobile Support | 4 | Week 31 | Offline attendance, push notifications |
| M17 – AI Grading Prototype | 4 | Week 33 | Proof‑of‑concept for auto‑grading objective questions |
| M18 – Launch Readiness & GA | 4 | Week 34 | All checks green, documentation complete, production deploy |

## 2. Milestone Acceptance Criteria
Each milestone is "Done" when:
- All related specs passed by QA.
- All unit/integration/E2E tests green in CI.
- No critical or high-severity security findings.
- Documentation updated and peer-reviewed.
- Stakeholder sign‑off recorded.

## 3. Tracking
- Tracked in GitHub Projects board (Kanban).
- Weekly sprint reviews; milestone gates at sprint boundaries.