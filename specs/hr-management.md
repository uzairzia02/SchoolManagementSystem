# HR Management Module Specification

## 1. Purpose
Manage employee records, payroll integration, benefits, and HR-specific workflows for school staff.

## 2. Features
- Employee directory with job details
- Department & designation management (shared with teacher-module)
- Contract & employment type tracking
- Leave management (extended)
- Benefits & deductions tracking
- Payroll export (CSV)
- Employee self-service portal

## 3. User Flows
### HR Admin
1. Search/Filter employees
2. Create employee record (teacher or staff)
3. Assign contract & benefits
4. Process leave requests
5. Generate payroll report
### Employee (Teacher/Staff)
1. View profile & benefits
2. Submit leave request
3. Update personal details
4. View payslip (if integrated)
5. Upload documents

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/employees` | ✅ (Admin/HR) | List employees (all staff) |
| GET | `/api/v1/employees/:id` | ✅ (Owner/HR) | Get employee details |
| POST | `/api/v1/employees` | ✅ (HR) | Create employee |
| PUT | `/api/v1/employees/:id` | ✅ (Owner/HR) | Update employee |
| DELETE | `/api/v1/employees/:id` | ✅ (Admin) | Soft delete employee |
| GET | `/api/v1/employees/:id/contracts` | ✅ (Owner/HR) | List employment contracts |
| POST | `/api/v1/employees/:id/contracts` | ✅ (HR) | Create contract |
| GET | `/api/v1/employees/:id/leave` | ✅ (Owner/HR) | View leave history |
| POST | `/api/v1/employees/:id/leave` | ✅ (Owner) | Submit leave request |
| GET | `/api/v1/employees/:id/benefits` | ✅ (Owner/HR) | List benefits |
| POST | `/api/v1/employees/:id/payroll` | ✅ (HR) | Generate payslip (mock) |

## 5. Database Tables
- `employees` (id, user_id, first_name, last_name, employee_type [teacher/staff], department_id, designation_id, school_id, hire_date, termination_date, created_at, updated_at, deleted_at)
- `employee_contracts` (id, employee_id, contract_type, start_date, end_date, salary, created_at)
- `employee_benefits` (id, employee_id, benefit_type, provider, amount, start_date, end_date)
- `employee_documents` (id, employee_id, file_path, description, uploaded_at)
- `leave_requests` (shared with attendance-module)

## 6. RBAC Permissions
| Role | Employee CRUD | Contract Manage | Benefits View | Leave Approve | Payroll Export |
|------|---------------|-----------------|---------------|---------------|----------------|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) |
| HR | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) |
| Accountant | ❌ | ❌ | ❌ | ❌ | ✅ (school) |
| Teacher/Staff | Read only | Read only | Read only | ✅ (own) | ✅ (own payslip) |

## 7. Validation Rules
- Employee must have valid `user_id`
- Contract dates: start ≤ end, termination_date ≥ hire_date
- Benefit amount ≥ 0
- Leave: require doctor's note for >3 consecutive days

## 8. Business Logic
- Employee types: `teacher`, `staff`, `administrator`, `faculty`
- Contract renewal triggers notification 30 days before expiry
- Leave balances tracked per employee per year
- Payroll export integrates with external systems (stub provided)