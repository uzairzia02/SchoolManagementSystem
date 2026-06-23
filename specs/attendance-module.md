# Attendance Module Specification

## 1. Purpose
Track daily/period attendance, late arrivals, leave status, and generate monthly reports for students and staff.

## 2. Features
- **Daily Attendance**: Mark present/absent/late/leave for each student
- **Period Attendance**: Subject-wise attendance tracking
- **Bulk Entry**: Quick entry for entire class
- **Late Arrival**: Separate tracking with threshold configuration
- **Leave Management**: Apply/approve leave with reason
- **Monthly Reports**: PDF/CSV export
- **Analytics Dashboard**: Attendance trends, percentages

## 3. User Flows
### Teacher
1. Open attendance page for assigned class
2. See student roster for selected date
3. Mark status (Present, Absent, Late, Leave)
4. Add remarks if needed (late with reason)
5. Submit for the day
6. View monthly summary

### Student/Parent
1. View attendance history
2. See late/leave statistics
3. Download monthly report

### Admin
1. Configure attendance settings (late threshold)
2. Generate reports for any class/date range
3. View school-wide attendance analytics

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/attendance/classes` | ✅ (Teacher) | Get teachable classes |
| GET | `/api/v1/attendance/class/:classId` | ✅ (Teacher) | Get roster for date |
| POST | `/api/v1/attendance/mark` | ✅ (Teacher) | Submit attendance |
| POST | `/api/v1/attendance/leave` | ✅ (Student/Parent) | Apply for leave |
| GET | `/api/v1/attendance/report` | ✅ (Admin) | Generate report |
| GET | `/api/v1/attendance/student/:studentId` | ✅ (Parent/Student) | Student report |

## 5. Data Model
```prisma
model Attendance {
  id        String   @id @default(uuid())
  studentId String
  classId   String
  date      DateTime @default(now())
  status    AttendanceStatus
  remark    String?
  markedById String?
  schoolId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([studentId, date, classId])
  @@index([schoolId, date])
  @@index([studentId])
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  LEAVE
}
```

## 6. Validation Rules
- Date cannot be future
- Cannot mark attendance for past dates without reason
- Late arrival must have remark if time > threshold (configurable: default 15 min)
- Leave must be applied before or on the day
- Bulk entry limited to 100 records per request

## 7. Business Logic
- Late threshold configurable per school (default 15 minutes)
- Weekly summary triggers notification to parents if >2 absences
- Monthly report calculates:
  - Total working days
  - Days present
  - Days absent
  - Days late
  - Leave taken
  - Attendance percentage

## 8. Notifications
- Daily: Teacher receives reminder if not marked
- Weekly: Parent summary of child's attendance
- Monthly: Low attendance alert to admin/principal

## 9. Reporting
- PDF format includes school logo, student details, monthly calendar
- CSV export for bulk download
- Charts: Line graph of attendance % over month

## 10. Permissions
| Role | View | Mark | Leave Apply | Reports |
|------|------|------|-------------|---------|
| Super Admin | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ | ✅ | ✅ | ✅ |
| Teacher | Class only | ✅ (own class) | ❌ | ✅ (school) |
| Student | Own | ❌ | ✅ (own) | ✅ (own) |
| Parent | Child's | ❌ | ❌ | ✅ (child) |
| HR | ❌ | ❌ | ❌ | ❌ |