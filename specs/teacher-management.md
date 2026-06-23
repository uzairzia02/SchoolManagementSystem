# Teacher Management Module Specification

## 1. Purpose
Enable comprehensive lifecycle management of teachers: profiles, assignments, scheduling, and availability.

## 2. Features
- Teacher profile management (name, credentials, photo)
- Department and designation assignment
- Assignment to classes/sections
- Availability calendar (office hours, office hours, substitution)
- Leave application and approval workflow
- Document uploads (certificates, transcripts)
- Notification preferences
- Bio/portfolio section

## 2. Data Flow
### Admin/HR
1. Search/Filter teachers
2. Create new teacher record
3. Assign to department/role
3. Assign to class/section
4. Upload documents
4. Approve leave requests
5. Export payroll data

### Teacher (Self)
1. View own profile/photo
2. View assigned classes/schedule
3. Submit availability changes
4. Submit leave request
5. Upload documents (CV, certifications)
6. View own attendance history

### Admin/HR
1. Manage department hierarchy
2. Assign teachers to classes
3. Approve/Reject leave requests
3. Import/export excel licenses, contracts
4. Set teacher availability (day/time availability)

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/teachers` | ✅ (Admin/HR) | Create teacher |
| GET | `/api/v1/teachers` | ✅ (Admin/Principal) | List teachers |
| GET | `/api/v1/teachers/{id}` | ✅ (Owner) | Get teacher details |
| PUT | `/api/v1/teachers/{id}` | ✅ (Owner/Admin) | Update teacher info |
| DELETE | `/api/v1/teachers/{id}` | ✅ (Super Admin) | Soft delete teacher |
| POST | `/api/v1/teachers/{id}/classes` | ✅ (Admin) | Assign teacher to class |
| DELETE | `/api/v1/teachers/{id}/classes/:classId` | ✅ (Admin) | Unassign class |
| GET | `/api/v1/teachers/{id}/classes` | ✅ (Teacher) | List classes assigned |
| POST | `/api/v1/teachers/{id}/documents` | ✅ (Self) | Upload documents |
| POST | `/api/v1/teachers/{id}/availability` | ✅ (Teacher) | Submit availability settings |

## 3. Database Schema
```prisma
model Teacher {
  id          String   @id @default(uuid())
  userId      String   @unique
  firstName   String
  lastName    String
  departmentId String?
  department    Department
  designationId String
  designationsTaken [] {}
  photo       String?   // Cloudinary path
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt   DateTime?
  schoolId    String
  department  Department? 
  
  assessments TakenByTeacher {}

  relationsId: string
  registers        TeacherDepartmentRelationship[]
  subjectsTaught  SubjectTeachingAssignment[]

  @@index([schoolId])
  @@unique([userId])
}

model TeacherDepartmentRelationship {
  id        Int      @id @default(autoincrement())
  teacherId String
  departmentId String
  createdAt DateTime @default(now())
  
  @@index([teacherId])
  @@index([departmentId])
}

model Department {
  id            Int       @id    @auto_increment()
  schoolId      String
  name          String
  shortName   String
  teacherCount  Int       // Precomputed
  assignments   TeacherDepartmentRelationship[]
  
  @@unique([name, schoolId])
  @@index([schoolId])
```

## 2. Validation Rules
- Teacher name cannot be empty
- Designation must exist in `designations` enum
- Department must be within school's org structure
- Availability conflicts with class schedule
- Photo upload requires admin verification

## 3. Validation Engine
- Schematized input with Zod
- Mandatory fields: `firstName`, `lastName`, `role`
- Email must validate against user registration
- Max teacher roster per department (configurable: 50 per department)

- Teacher must be linked to existing `user` record
- Cannot have same `email` as another teacher
- Must assign to at least one department

## 3. Validation Checks
- Reject creation if:
  - Email already exists in system
  - Missing required field (`firstName`/`lastName`)
  - `designationId` invalid
  - Association with non-existent department

## 3. Business Rules
### Availability Rules
- Balance check: Teacher assigned to max 6 classes (configurable)
- Must have associated subject/department
- Max concurrent assignments ≤ configured limit

- Overlap check: Prevent assigning two classes with overlapping time periods
- Prevent conflict assignments at same time period

### Business Rules
- Max 6 concurrent class assignments per teacher
- Leave balance: 15 working days/year
- Substitute coverage must be approved
- Overtime approval: требуется principal approval

## 5. Business Logic Integration
### Daily Operations
- Auto-check teacher availability before adding assignment
- Auto-block conflicting time slots
- Notify teacher with email/SMS when assigned new class
- Show availability calendar on teacher dashboard

### Validation Flow
1. Receive input (raw JSON)
2. Parse and validate schema
3. Check department exists
3. Check class capacity constraints
4. Check existing overlaps
5. Persist assignment
6. Update teacher's schedule view

## 3. UI Components
| Section | Components |
|---------|----------|
| **Profile**: | Photo upload, name, credentials, contact, DEPT |
| **Classes**: | Grid of assigned classes with time/day
| **Availability**: | Calendar view (highlighted busy slots)
| **Leave Changes**: | Calendar + dropdown for reason
| **Upload**: | Drag area for docs, preview, submit
| **Leave Form**: | Reason + dates + attach files

## 4. Key Flows
### Teacher Self-Service Flow
1. View profile → Edit profile → Upload photo
2. View schedule → Add class → Remove class
3. Submit availability changes → System validates with calendar
4. Submit leave request → Approver queue UI
5. View own attendance/schedule changes

### Admin View
1. View teacher list → Filter by dept/role
2. View availability calendar
3. Assign to classes via drag-and-drop
4. Approve/reject leave requests
5. Export payroll data

## 3. API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/teachers` | ✅ (Admin/HR) | Create teacher |
| GET | `/api/v1/teachers` | ✅ (Admin/Principal) | List teachers |
| GET | `/api/v1/teachers/{id}` | ✅ (Owner/Admin) | Get teacher details |
| PUT | `/api/v1/teachers/{id}` | ✅ (Owner) | Update teacher info |
| DELETE | `/api/v1/teachers/{id}` | ✅ (Super Admin) | Soft delete teacher |
| GET | `/api/v1/teachers/{id}/classes` | ✅ (Teacher) | List classrooms assigned |
| POST | `/api/v1/teachers/{id}/classes/{classId}` | ✅ (Admin) | Assign teacher to class |
| DELETE | `/api/v1/teachers/{id}/classes/{classId}` | ✅ (Admin) | Unassign class |
| GET | `/api/v1/teachers/{id}/documents` | ✅ (Owner) | View documents |
| POST | `/api/v1/teachers/{id}/documents` | ✅ (Owner) | Upload document |
| GET | `/api/v1/teachers/{id}/leave` | ✅ (Owner) | List leave requests |
| POST | `/api/v1/teachers/{id}/leave` | ✅ (Teacher) | Submit leave request |

## 3. Validation Rules
| Field | Rule |
|-------|-------|-------|
| First/Last Name | Required, 1-50 chars |
| Designation | Enum: TeachingStaff, FormTeacher, HeadTeacher, etc. |
| Department | Must exist in `departments` |
| Photo | MIME type: image/* and ratio check 1:1 to 1:4 |
| Bio/Image | Max 300 chars, no HTML |
| Department Selection | Must be active and within same school |

## 4. Business Rules
- Designation flow: TeachingStaff → SeniorTeacher → HeadTeacher → Principal → SuperPrincipal hierarchy
- Each teacher can hold one designation at a time
- Department assignment cannot conflict with scheduled classes
- Permissions flow: Designation → Class Assignment → Course Coverage
- Departments have English/Spanish naming auto-translations
- Leave approval requires Principal or Superior sign-off

## 4. Business Logic Flows
### Filing Application
1. Input fields: Name, Photo, Bio, Bio, Credentials, Department
2. Save → Validate CSV/Excel import
3. Validate: Name format, email domains, photo URL
3. Assign Department/Role hierarchy
4. Update member count for Department DB
5. Verify photo attached before saving

## 4. UI Validation
- Accessible dropdowns with keyboard navigation
- Real-time validation on submit
- Success toast + redirect
- Photo upload preview

## 4. Dependency Flow
- Requires Department model (completed)
- Requires DepartmentAssignment model (completed)
- Relies on User authentication flow
- Uses same API layer as other modules

## Deployment Units
- Teacher CRUD Service (`teacher.service.ts`)
- Department Relationship Controller (`types/teacher/DepartmentRelationship.ts`)
- Repository Layer (`teacher.repository.ts`)
- Validation Logic (`teacher.validations.ts`)