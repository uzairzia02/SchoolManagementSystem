# Task Breakdown

## Phase 1 – Authentication & Core

### Sprint 1 – Setup & Foundations
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.1 | Initialize Next.js project with shadcn/ui | High | 1 day | — |
| T0.2 | Setup Prisma schema with User,School models | High | 2 days | — |
| T0.3 | Implement NextAuth credentials provider | High | 2 days | — |
| T0.4 | Create tenant middleware (`schoolId` extraction) | High | 1 day | — |
| T0.5 | Add Zod validation schemas for auth | Medium | 1 day | — |
| T0.6 | Write unit tests for auth flow (80% coverage) | High | 2 days | — |
| T0.7 | CI pipeline with GitHub Actions | High | 1 day | — |

### Sprint 2 – RBAC & Authorization
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.8 | Define RBAC matrix (authorization-rbac.md) | High | 0.5 day | — |
| T0.9 | Implement role-guard middleware | High | 1 day | T0.4 |
| T0.10 | Create `withPermission` HOC | Medium | 1 day | T0.9 |
| T0.11 | Unit + integration tests for RBAC | High | 2 days | T0.9 |
| T0.12 | API error handler wrapper | Medium | 1 day | T0.9 |

### Sprint 3 – Student Management
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.13 | Student Prisma model + migration | High | 1 day | T0.2 |
| T0.14 | Student CRUD API endpoints (v1) | High | 2 days | T0.9 |
| T0.15 | Student directory UI (TanStack Table) | Medium | 1 day | T0.1 |
| T0.16 | Student form (React Hook Form) | Medium | 1 day | T0.15 |
| T0.17 | Audit log integration for student actions | High | 1 day | T0.9 |
| T0.18 | Integration tests for Student API | High | 2 days | T0.14 |

### Sprint 4 – Teacher & Attendance
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.19 | Teacher model + endpoints | High | 1 day | T0.2 |
| T0.20 | Attendance model + endpoints | High | 1 day | T0.13, T0.19 |
| T0.21 | Attendance capture UI with calendar | Medium | 2 days | T0.1 |
| T0.22 | Monthly attendance report generation | High | 1 day | T0.20 |
| T0.23 | E2E tests: Teacher attendance flow | Medium | 2 days | T0.21 |

---

## Phase 2 – Academics & Fees

### Sprint 5 – Timetable & Exams
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.24 | Schedule models (events, rooms) | High | 2 days | T0.2 |
| T0.25 | Timetable drag-drop builder UI | Medium | 3 days | T0.1 |
| T0.26 | Conflict detection algorithm | High | 1 day | T0.24 |
| T0.27 | Exam models + endpoints | High | 2 days | T0.13 |
| T0.28 | Student exam submission flow | Medium | 2 days | T0.27 |

### Sprint 6 – Grading & Fees
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.29 | Grading service with GPA calc | High | 2 days | T0.27 |
| T0.30 | PDF report card generation | Medium | 2 days | T0.29 |
| T0.31 | Fee models + CRUD endpoints | High | 1 day | T0.13 |
| T0.32 | Fee payment UI (integration stub) | Medium | 1 day | T0.1 |
| T0.33 | Fee receipt PDF download | High | 1 day | T0.32 |

### Sprint 7 – Phase 1 Integration
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.34 | Dashboard widgets (KPIs) | Medium | 2 days | T0.17, T0.22, T0.33 |
| T0.35 | End-to-end tests Phase 1 flows | High | 2 days | T0.18, T0.23, T0.30 |
| T0.36 | Pilot school onboarding script | High | 2 days | T0.5 |

---

## Phase 3 – Administration & Parent Portal

### Sprint 8 – HR & Employees
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.37 | Employee model + CRUD endpoints | High | 2 days | T0.2 |
| T0.38 | Contract & leave endpoints | Medium | 2 days | T0.37 |
| T0.39 | Payroll export CSV | Medium | 1 day | T0.37 |
| T0.40 | HR admin UI | Medium | 2 days | T0.1 |

### Sprint 9 – Parent Portal & Notifications
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.41 | Parent link model + endpoints | High | 1 day | T0.13, T0.3 |
| T0.42 | Parent portal UI (child view) | Medium | 2 days | T0.1 |
| T0.43 | Email notification service | High | 1 day | T0.3 |
| T0.44 | In-app notification UI component | Medium | 1 day | T0.1 |
| T0.45 | E2E test Parent fee payment | Medium | 1 day | T0.41, T0.32 |

### Sprint 10 – File Storage & Audit
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.46 | Signed URL file upload/download | High | 2 days | T0.3 |
| T0.47 | VirusTotal scan integration | High | 1 day | T0.46 |
| T0.48 | Audit log table + service | High | 2 days | T0.9 |
| T0.49 | Audit search UI | Medium | 1 day | T0.48 |
| T0.50 | Security audit checklist | High | 1 day | T0.48 |

---

## Phase 4 – Performance & Polish

### Sprint 11 – Optimization
| Task ID | Title | Priority | Duration | Dependencies |
|---------|-------|----------|----------|------------|
| T0.51 | Implement React Query caching | Medium | 2 days | All modules |
| T0.52 | Optimize bundle size (<100KB) | Medium | 2 days | T0.1 |
| T0.53 | Add rate limiting middleware | High | 1 day | T0.4 |
| T0.54 | Performance test suite (k6) | Medium | 1 day | All modules |
| T0.55 | Update docs for new endpoints | Low | 1 day | All |

---

*Each task links to the corresponding module spec file for acceptance criteria.*