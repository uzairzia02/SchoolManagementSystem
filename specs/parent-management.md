# Parent Management Module Specification

## 1. Purpose
Enable parents/guardians to view their children's academic records, attendance, fees, and submit leave requests.

## 2. Features
- Parent profile & children linking
- View child attendance & grades
- Fee status & payment initiation
- Leave request submission
- Notification preferences
- Document upload (medical forms)

## 3. User Flows
### Admin
1. Link parent to student via admin UI
2. Bulk import parent-student relationships (CSV)
### Parent
1. Login via credentials or SSO
2. View linked children list
3. Select child → view dashboard
4. Pay fees online
5. Upload documents
6. Set notification preferences

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/parents` | ✅ (Admin/Principal) | List linked parents |
| GET | `/api/v1/parents/:id` | ✅ (Owner/Admin) | Get parent details |
| POST | `/api/v1/parents` | ✅ (Admin) | Create parent link |
| PUT | `/api/v1/parents/:id` | ✅ (Owner/Admin) | Update parent |
| DELETE | `/api/v1/parents/:id` | ✅ (Admin) | Remove parent link |
| GET | `/api/v1/parents/:id/children` | ✅ (Owner) | List linked children |
| GET | `/api/v1/parents/:id/fees` | ✅ (Owner) | Get child's fee status |
| POST | `/api/v1/parents/:id/fees/:feeId/pay` | ✅ (Owner) | Initiate fee payment |
| POST | `/api/v1/parents/:id/leave` | ✅ (Owner) | Submit leave request |

## 5. Database Tables
- `parents` (id, user_id, first_name, last_name, school_id, created_at, updated_at, deleted_at)
- `student_parent_link` (id, student_id, parent_id, relationship, is_primary, created_at)
- `leave_requests` (shared with attendance-module)

## 6. RBAC Permissions
| Role | Parent CRUD | View Child Data | Pay Fees | Submit Leave |
|------|-------------|-----------------|----------|--------------|
| Super Admin | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) |
| HR | ✅ (school) | ❌ | ❌ | ❌ |
| Accountant | ❌ | ❌ | ✅ (school) | ❌ |
| Teacher | ❌ | View only | ❌ | ❌ |
| Parent (Self) | Read only | ✅ (own child) | ✅ (own child) | ✅ (own child) |
| Student | ❌ | ❌ | ❌ | ❌ |

## 7. Validation Rules
- Parent must have valid email/phone
- Link requires valid `student_id` that belongs to same school
- Fee payment only for unpaid fees
- Leave reason required, max 500 chars

## 8. Business Logic
- Parent may link to multiple children (siblings)
- Soft delete preserves payment history
- Payment triggers webhook to payment gateway
- Notification sent on successful fee payment