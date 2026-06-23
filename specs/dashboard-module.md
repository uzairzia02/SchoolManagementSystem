# Dashboard Module Specification

## 1. Purpose
Provide role-specific dashboards with KPIs, charts, recent activity, and quick actions for all user types.

## 2. Features
- **Role-Based Layouts**: Unique dashboard per role (Super Admin, Principal, HR, Accountant, Teacher, Faculty, Student, Parent)
- **KPIs**: Key metrics with trend indicators
- **Charts**: Attendance trends, fee collection, exam performance, enrollment
- **Recent Activity**: Latest events, notifications, actions
- **Quick Actions**: Role-specific shortcuts to common tasks

## 3. User Flows
### Super Admin
1. View cross-school metrics
2. Monitor system health
3. Quick access to tenant management

### Principal
1. School-wide attendance summary
2. Fee collection rate
3. Academic performance overview
4. Pending approvals

### Teacher
1. Today's schedule
2. Pending grading
3. Class attendance status
4. Upcoming exams

### Student
1. Today's timetable
2. Pending assignments
3. Recent grades
4. Fee dues

### Parent
1. Child's attendance summary
2. Fee status
3. Upcoming events
4. Recent notifications

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/dashboard/super-admin` | ✅ (Super Admin) | Cross-school dashboard data |
| GET | `/api/v1/dashboard/principal` | ✅ (Principal) | School dashboard |
| GET | `/api/v1/dashboard/teacher` | ✅ (Teacher) | Teacher dashboard |
| GET | `/api/v1/dashboard/student` | ✅ (Student) | Student dashboard |
| GET | `/api/v1/dashboard/parent` | ✅ (Parent) | Parent dashboard |
| GET | `/api/v1/dashboard/hr` | ✅ (HR) | HR dashboard |
| GET | `/api/v1/dashboard/accountant` | ✅ (Accountant) | Finance dashboard |

## 5. Data Requirements
- Aggregated queries for KPIs (cached for 5 minutes)
- Time-series data for charts (attendance, fees, grades)
- Notification feed (latest 10 items)
- Quick action buttons mapped to routes

## 6. UI Components
- **KPICard**: Value, label, trend, comparison
- **ChartContainer**: Recharts wrapper (Line, Bar, Pie, Area)
- **ActivityFeed**: List with timestamps, icons, links
- **QuickActionGrid**: Icon + label + route
- **Skeleton Loaders**: For all async data

## 7. Permissions
| Role | Dashboard Access | KPIs | Charts | Quick Actions |
|------|------------------|------|--------|--------|--------|----------------|------|--------|---------------|
| Super Admin | ✅ | ✅ (all) | ✅ (all) | ✅ (all) |
| Principal | ✅ | ✅ (school) | ✅ (school) | ✅ (school) |
| HR | ✅ | ✅ (HR) | ❌ | ✅ (HR) |
| Accountant | ✅ | ✅ (Finance) | ✅ (Finance) | ✅ (Finance) |
| Teacher | ✅ | ✅ (class) | ✅ (class) | ✅ (class) |
| Student | ✅ | ✅ (self) | ✅ (self) | ✅ (self) |
| Parent | ✅ | ✅ (child) | ✅ (child) | ✅ (child) |

## 8. Validation Rules
- Dashboard data scoped by `schoolId`
- No cross-tenant data in dashboards
- Cache invalidation on data mutations

## 9. Business Logic
- KPIs calculated via background jobs (every 5 min)
- Charts use downsampled data for performance
- Quick actions are route links, no business logic

## 10. Edge Cases
- New users: show onboarding quick actions
- No data states: show empty state illustrations
- Slow queries: skeleton loaders with timeout fallback