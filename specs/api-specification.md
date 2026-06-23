# API Specification (REST, version v1)

All endpoints are under the base path: **`/api/v1/`** and accept **JSON** payloads.

## Authentication Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST   | `/auth/login` | ❌ | Authenticate user, issue JWT cookie. |
| POST   | `/auth/logout` | ✅ | Invalidate session cookie. |
| POST   | `/auth/refresh` | ✅ | Refresh JWT token. |

## School Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/schools` | ✅ (Super Admin) | List all schools (Super Admin only). |
| GET    | `/schools/:schoolId` | ✅ (Super Admin) | Get school details by ID. |
| POST   | `/schools` | ✅ (Super Admin) | Create a new school. |
| PUT    | `/schools/:schoolId` | ✅ (Super Admin) | Update school details. |
| DELETE | `/schools/:schoolId` | ✅ (Super Admin) | Delete school (soft delete). |

## User Management Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/users` | ✅ (Super Admin/Principal/HR) | List users in school. |
| GET    | `/users/:id` | ✅ (Super Admin/Principal/HR) | Get user details by ID. |
| POST   | `/users` | ✅ (Super Admin/Principal/HR) | Create new user. |
| PUT    | `/users/:id` | ✅ (Super Admin/Principal/HR) | Update user details. |
| DELETE | `/users/:id` | ✅ (Super Admin) | Delete user (soft delete). |

## Student Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/students` | ✅ (Principal/Teacher) | List students in school/class. |
| GET    | `/students/:id` | ✅ (Principal/Teacher/Parent/Student) | Get student details. |
| POST   | `/students` | ✅ (Principal/Teacher) | Create new student. |
| PUT    | `/students/:id` | ✅ (Principal/Teacher) | Update student details. |
| DELETE | `/students/:id` | ✅ (Principal) | Delete student (soft delete). |
| GET    | `/students/:id/enrollments` | ✅ (Principal/Teacher) | Get student enrollments. |

## Teacher Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/teachers` | ✅ (Principal/HR) | List teachers in school/department. |
| GET    | `/teachers/:id` | ✅ (Principal/HR/Teacher) | Get teacher details. |
| POST   | `/teachers` | ✅ (Principal/HR) | Create new teacher. |
| PUT    | `/teachers/:id` | ✅ (Principal/HR) | Update teacher details. |
| DELETE | `/teachers/:id` | ✅ (Principal) | Delete teacher (soft delete). |

## Attendance Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/attendance` | ✅ (Teacher) | Get attendance records (filter by date/class). |
| POST   | `/attendance` | ✅ (Teacher) | Submit attendance batch for a class. |
| GET    | `/attendance/student/:studentId` | ✅ (Parent/Student) | Get attendance for specific student. |
| GET    | `/attendance/report/monthly` | ✅ (Principal) | Generate monthly attendance report. |

## Examination Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/exams` | ✅ (Teacher) | List exams (filter by class/date). |
| GET    | `/exams/:id` | ✅ (Teacher/Student) | Get exam details. |
| POST   | `/exams` | ✅ (Teacher) | Create new exam. |
| PUT    | `/exams/:id` | ✅ (Teacher) | Update exam details. |
| DELETE | `/exams/:id` | ✅ (Teacher) | Delete exam (soft delete). |
| POST   | `/exams/:id/grades` | ✅ (Teacher) | Submit grades for exam. |
| GET    | `/exams/:id/grades` | ✅ (Teacher/Student) | Get grades for exam. |
| GET    | `/exams/:id/report-card` | ✅ (Student/Parent) | Generate exam report card (PDF). |

## Fee Management Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/fees` | ✅ (Accountant/Principal) | List fees (filter by student/status). |
| GET    | `/fees/:id` | ✅ (Accountant/Principal) | Get fee details. |
| POST   | `/fees` | ✅ (Accountant/Principal) | Create new fee record. |
| PUT    | `/fees/:id` | ✅ (Accountant/Principal) | Update fee details. |
| POST   | `/fees/:id/pay` | ✅ (Parent) | Record payment for fee. |
| GET    | `/fees/student/:studentId` | ✅ (Parent) | Get all fees for a student. |
| GET    | `/fees/report` | ✅ (Accountant) | Generate fee collection report. |

## Notification Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/notifications` | ✅ (All) | Get user notifications (paginated). |
| POST   | `/notifications/read` | ✅ (All) | Mark notifications as read. |
| DELETE | `/notifications/:id` | ✅ (All) | Delete notification. |

## File Storage Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST   | `/files/upload` | ✅ (All) | Upload file (with virus scan). |
| GET    | `/files/:fileId` | ✅ (Owner) | Download file. |
| DELETE | `/files/:fileId` | ✅ (Owner) | Delete file (soft delete). |

## Audit Log Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/audit-logs` | ✅ (Super Admin) | Query audit logs (filter by date/user/action). |
| GET    | `/audit-logs/:id` | ✅ (Super Admin) | Get audit log entry details. |

## Common Request/Response Format
All responses follow the standard wrapper:

```json
{
  "success": boolean,
  "data": object | null,
  "error": {
    "code": string,
    "message": string,
    "details": array
  } | null
}
```

Error codes include:
- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `• `INTERNAL_ERROR` RATE_LIMIT_EXTERNAL_SERVICE_ERROR_

- All endpoints enforce TLS 1.3.
- CSRF protection via SameSite-Strict cookie.
- Input validation using Zod schemas.
- Rate limiting: 100 requests per minute per authenticated user.
- Pagination: `page`, `limit`, `sort`, `order` parameters.
- Filtering: Entity-specific query parameters (e.g., `status=paid`).
- All timestamps in ISO 8601 format UTC.