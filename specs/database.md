# Database Design (PostgreSQL + Prisma)

## 1. Naming Conventions
- Tables: `snake_case_plural` (e.g., `students`, `teachers`).
- Columns: `snake_case`.
- Primary keys: `id` (UUID v4).
- Foreign keys: `<entity>_id` with `_fk` suffix in constraints.

## 2. Core Prisma Schema (excerpt)
```prisma
model School {
  id        String   @id @default(uuid())
  name      String
  address   String?
  phone     String?
  email     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  students   Student[]
  teachers   Teacher[]
  users      User[]
  classes    Class[]
  subjects   Subject[]
  exams      Exam[]
  fees       Fee[]
  attendance Attendance[]
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String?
  role         Role
  schoolId     String
  school       School   @relation(fields: [schoolId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  deletedAt    DateTime?

  @@index([schoolId])
}

model Student {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  firstName String
  lastName  String
  dob       DateTime?
  gender    Gender?
  classId   String
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([schoolId])
  @@index([classId])
}

model Teacher {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  firstName   String
  lastName    String
  departmentId String?
  schoolId    String
  school      School   @relation(fields: [schoolId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?

  @@index([schoolId])
  @@index([departmentId])
}

model Attendance {
  id        String   @id @default(uuid())
  studentId String
  date      DateTime @default(now())
  status    AttendanceStatus
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([studentId])
  @@index([schoolId, date])
}

model Exam {
  id        String   @id @default(uuid())
  name      String
  type      ExamType
  date      DateTime
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([schoolId])
}

model Fee {
  id        String   @id @default(uuid())
  studentId String
  amount    Decimal
  status    FeeStatus
  dueDate   DateTime
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  @@index([studentId])
  @@index([schoolId])
}

enum Role {
  SUPER_ADMIN
  PRINCIPAL
  HR
  ACCOUNTANT
  TEACHER
  FACULTY
  STUDENT
  PARENT
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  LEAVE
}

enum ExamType {
  MID_TERM
  FINAL
  QUIZ
  ASSIGNMENT
}

enum FeeStatus {
  PAID
  UNPAID
  OVERDUE
  CANCELLED
}
```

## 3. Indexes Strategy
- Required on all foreign keys (`school_id`, `student_id`, etc.).
- Composite index on `(school_id, date)` for attendance queries.
- Partial indexes for soft-deleted rows not needed; apps filter `deletedAt IS NULL`.

## 4. Soft Deletes & Audit Fields
- `deletedAt` nullable; soft delete via update.
- `createdBy`, `updatedBy` fields reference `User.id` for accountability.
- Queries filter `WHERE deleted_at IS NULL` by default.

## 5. Data Retention
- Student/teacher records: retained for 7 years after school exit.
- Audit logs: retained for 2 years, archived to cold storage.

## 6. Migration Strategy
- All schema changes via `prisma migrate dev`.
- Staging applies migrations on deploy; production via `prisma migrate deploy`.