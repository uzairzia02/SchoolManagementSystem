# Reporting System Module Specification

## 1. Purpose
Generate, export, and schedule comprehensive reports for administrative, academic, and financial stakeholders.

## 2. Features
- **PDF Export**: Report cards, attendance summaries, fee receipts
- **CSV Export**: Bulk data for analysis
- **Scheduled Reports**: Auto-generate and email daily/weekly/monthly
- **Custom Report Builder**: Drag-and-drop interface (future)
- **Audit Trail**: All report generation logged

## 3. Report Types
| Report Type | Audience | Format | Frequency |
|-------------|----------|--------|-----------|
| Attendance Summary | Principal, Teacher | PDF, CSV | Daily, Weekly, Monthly |
| Fee Collection | Accountant, Principal | PDF, CSV | Daily, Monthly |
| Student List | Admin, Teacher | CSV, PDF | On-demand |
| Exam Results | Teacher, Principal | PDF | Post-exam |
| Grade Report Card | Student, Parent | PDF | Per-term |
| Staff Directory | HR, Admin | CSV, PDF | On-demand |
| Payroll Summary | Accountant | CSV | Monthly |
| Audit Logs | Super Admin | CSV | On-demand |

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/reports/attendance` | ✅ (Admin) | Attendance report |
| GET | `/api/v1/reports/fees` | ✅ (Finance) | Fee collection report |
| GET | `/api/v1/reports/students` | ✅ (Admin) | Student list report |
| GET | `/api/v1/reports/exam/:examId` | ✅ (Teacher) | Exam results report |
| GET | `/api/v1/reports/grades/:studentId` | ✅ (Student/Parent) | Grade report card |
| GET | `/api/v1/reports/staff` | ✅ (HR) | Staff directory |
| GET | `/api/v1/reports/payroll` | ✅ (Accountant) | Payroll summary |
| GET | `/api/v1/reports/audit` | ✅ (Super Admin) | Audit log export |
| POST | `/api/v1/reports/schedule` | ✅ (Admin) | Schedule recurring report |

## 5. Data Requirements
- Jurisdiction filters: schoolId, date range, class, section
- Export format: PDF (via Puppeteer), CSV (via csv-stringify)
- Template storage: EJS templates in `reports/templates/`

## 6. UI Pages
- `/reports/attendance` – Form + preview + export
- `/reports/fees` – Fee summary with charts
- `/reports/exam-results` – Exam-wise analysis
- `/reports/report-cards` – Grade-wise report cards
- `/reports/scheduled` – Manage scheduled reports

## 7. Permissions
| Role | Attendance | Fees | Students | Exam | Grades | Staff | Payroll | Audit |
|------|------------|------|----------|------|--------|-------|---------|-------|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| HR | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Accountant | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Teacher | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Student | ❌ | ✅ (own) | ❌ | ❌ | ✅ (self) | ❌ | ❌ | ❌ |
| Parent | ❌ | ✅ (child) | ❌ | ❌ | ✅ (child) | ❌ | ❌ | ❌ |

## 8. Business Rules
- Reports generated asynchronously via background job queue
- PDF filenames include `schoolId`, `reportType`, `timestamp`
- Scheduled reports respect tenant timezone settings
- Retention: generated reports kept for 30 days, then archived

## 9. Edge Cases
- Empty dataset → show "No records found" message
- Large exports (>10k rows) → split into multiple files
- Timezone mismatch → use school's configured timezone
- Failed generation → retry 3 times, then alert admin