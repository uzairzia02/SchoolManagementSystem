# Student Management Module Specification

## 1. Purpose
Enable the management of student records, enrollments, and related academic data within the School ERP SaaS. Supports administrators, teachers, parents, and students themselves.

## 2. High‑Level Features
| Feature | Description |
|---------|-------------|
| **Student Directory** | Search, view, and filter student profiles. |
| **Enrollment Management** | Create, update, and enroll students in classes/sections. |
| **Attendance Tracking** | Record daily/period attendance; generate reports. |
| **Profile Management** | Personal details, contact information, emergency contacts. |
| **Document Management** | Upload academic documents (transcripts, health forms). |
| **Portal Access** | Parents and students can view own data via the portal. |
| **Analytics** | Export analytics (e.g., demographic breakdown, progression). |

## 2.1 User Flows
### a) Admin/Administrator
1. Search/Filter students.
2. Create a new student record.
3. Enroll student into a class/section.
4. Update existing records.
5. Export student list (CSV or PDF).

### b) Teacher
1. View roster of students in own classes.
2. Record attendance per class.
3. Access student profile (basic info, photo).

### c) Parent/Guardian
1. Log in via linked account.
2. View child's attendance, grades, schedule.
3. Receive notifications (e.g., absence, upcoming events).
4. Upload documents (e.g., medical forms).

### d) Student
1. Log in via single sign‑on (SSO) using school credentials.
2. View personal schedule, assignments, and attendance.
3. Submit assignments/homework (via portal).

## 3. API Endpoints (Versioned v1)

| Method | Path | Auth | Request Schema | Response Schema | Description |
|--------|------|------|----------------|----------------|-------------|
| GET | `/api/v1/students` | ✅ (Roles: Super Admin, Principal, Teacher) | — | `PaginatedStudentCollectionDTO` | List students (filterable by school, status). |
| GET | `/api/v1/students/{studentId}` | ✅ (Owner or higher role) | — | `StudentDTO` | Retrieve student details. |
| POST | `/api/v1/students` | ✅ (Super Admin, Principal) | `CreateStudentDTO` | `StudentDTO` | Create new student. |
| PUT | `/api/v1/students/{studentId}` | ✅ (Owner or higher) | `UpdateStudentDTO` | `StudentDTO` | Update student info. |
| DELETE | `/api/v1/students/{studentId}` | ✅ (Super Admin) | — | `DeleteResponse` | Soft‑delete student. |
| GET | `/api/v1/enrollments` | ✅ (Teacher) | — | `EnrollmentCollectionDTO` | Get enrollment status for a student. |
| POST | `/api/v1/enrollments` | ✅ (Teacher) | `CreateEnrollmentDTO` | `EnrollmentDTO` | Enroll student in a class/section. |
| DELETE | `/api/v1/enrollments/:enrollmentId` | ✅ (Teacher) | — | `DeleteResponse` | Remove enrollment. |
| GET | `/api/v1/attendance` | ✅ (Student/PARENT) | — | `AttendanceHistoryDTO` | View own attendance record. |
| POST | `/api/v1/attendance` | ✅ (Teacher) | `AttendanceCreateDTO` | `AttendanceDTO` | Record daily attendance. |
| GET | `/api/v1/documents` | ✅ (Owner) | — | `DocumentCollectionDTO` | List uploaded documents. |
| POST | `/api/v1/documents` | ✅ (Owner) | `DocumentCreateDTO` | `DocumentMetadataDTO` | Upload document (scanned files). |
| DELETE | `/api/v1/documents/:id` | ✅ (Owner) | — | `DeleteResponse` | Delete a document. |

*All endpoints automatically associate with the caller's `schoolId` via tenant middleware.*

## 3. Database Requirements
- **Tables**:
  - `students` (id, user_id, first_name, last_name, dob, gender, school_id, created_at, updated_at, deleted_at)
  - `enrollments` (id, student_id, class_id, role [teacher/assistant]), created_at, updated_at, deleted_at)
  - `attendance` (id, student_id, date, status, remark, created_at)
  - `documents` (id, student_id, file_path, mime_type, uploaded_by, created_at, deleted_at)
  - `parent_guardian` (id, student_id, first_name, last_name, relationship, email, phone)

- **Foreign Keys & Indexes**:
  - `students.school_id` indexed.
  - `enrollments.student_id` indexed.
  - `attendance.student_id` indexed.
  - `documents.student_id` indexed.

- **Soft Delete**:
  - Use `deleted_at` timestamp; filter on `deleted_at IS NULL` in all queries.

## 4. API Versioning
- All endpoints prefixed `/api/v1/`.
- Future changes bump version to `/api/v2/`.

## 5. Validation Rules
- **Student Creation** – Validate date_of_birth is a past date; enforce unique `user_id` (email) within the same school.
- **Enrollment** – Prevent duplicate enrollments for same class/section.
- **Document Upload** – MIME type whitelist, max 10 MiB, virus scan via third‑party API.

## 6. UI Pages (Front‑End)
| Page | Purpose | Key Components |
|------|---------|----------------|
| Student Directory | Searchable list of students | Table with pagination, filters, action buttons |
| Student Profile | View/edit own profile | Form with personal info, photo upload |
| Enrollment Management | Enroll into classes | Dropdown of available classes, “Enroll” button |
| Attendance Dashboard | Daily attendance list | Calendar view, quick‑mark checkboxes |
| Parent/Student Portal | Personal dashboard | Schedule, grades, attendance, document upload |
| Document Center | Manage uploaded files | List with preview, delete button |

## 6. Permissions (RBAC)

| Role | Permission on Student Management |
|------|-----------------------------------|
| Super Admin | Full CRUD (all operations) |
| Principal | CRUD on all students (school‑wide) |
| Teacher | Read‑only view of own class roster; create enrollments |
| Parent/Guardian | Read‑only view of own child’s data |
| Student (self) | Read‑only view of own profile, attendance, grades |
| HR/HR Admin | Read‑only view of student demographics (no CRUD) |

## 7. Business Rules & Edge Cases
- **Duplicate Accounts** – Prevent same email within same school.
- **Concurrent Enrollment** – Allow multiple enrollments (multiple classes).
- **Schedule Conflicts** – Validation when enrolling already‐full class.
- **Data Privacy** – Only owner or higher role can view full profile; lower roles see limited fields.
- **Soft Delete** – Deleting a student sets `deleted_at`; they remain queryable for historical data.
- **Audit Trail** – Every create/update/delete emits an `audit_log` entry.

## 7. Error Handling
- Validation errors → `400 Bad Request` with field‑specific messages.
- Permission errors → `403 Forbidden` with message “Insufficient privileges”.
- Unexpected server errors → `500 Internal Server Error` with generic message; stack trace logged server‑side only.

## 8. Testing Requirements
- Unit tests for repository layer (student CRUD).
- Integration tests for API layer (auth + enrollment flow).
- E2E tests covering:
  - Admin creates student → enrolls → parent views.
  - Parent logs in, sees child data.
  - Deleting student triggers soft delete and audit entry.
- Test data isolation via dedicated test schema.

## 9. Documentation
- API spec added to `api-specification.md`.
- Swagger/OpenAPI definition generated from annotations.
- UI mockups stored in `design-system.md`.
- Runbooks for admin tasks (e.g., bulk import students) documented in `implementation-plan.md`.

---  

*End of Specification*