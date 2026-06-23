# Audit Log System Module Specification

## 1. Purpose
Maintain an immutable, searchable record of all critical actions for compliance, debugging, and security monitoring.

## 2. Features
- **Immutable Storage**: Append-only, no DELETE allowed
- **Structured Logging**: JSON format with mandatory fields
- **Search & Filter**: By user, action, entity, date range
- **Export**: CSV/PDF for compliance audits
- **Real-time Alerts**: Trigger on sensitive actions
- **Retention Policy**: 2 years (configurable)

## 3. User Flows
### Admin (Super Admin)
1. Navigate to Audit Log UI
2. Filter by user/role/date/action
3. View detailed log entry
4. Export filtered results
### System
1. Action occurs (e.g., grade update)
2. Event logged via `auditLog.enqueue()`
3. Background worker writes to DB
4. Alert triggered if configured

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/audit-logs` | ✅ (Super Admin) | Search logs (paginated) |
| GET | `/api/v1/audit-logs/:id` | ✅ (Super Admin) | Get specific log entry |
| POST | `/api/v1/audit-logs/export` | ✅ (Super Admin) | Export to CSV/PDF |
| GET | `/api/v1/audit-logs/alerts` | ✅ (Super Admin) | Get configured alerts |
| POST | `/api/v1/audit-logs/alerts` | ✅ (Super Admin) | Create alert rule |

## 5. Log Entry Schema
```json
{
  "id": "uuid",
  "userId": "uuid",
  "userRole": "string",
  "action": "string",
  "entity": "string",
  "entityId": "uuid",
  "schoolId": "uuid",
  "ipAddress": "string",
  "userAgent": "string",
  "timestamp": "ISO8601",
  "metadata": { },
  "signature": "string"
}
```
- **Signature**: HMAC of entry payload for tamper detection

## 6. Actions Logged
| Category | Actions |
|----------|---------|
| Auth | login, logout, password-reset, mfa-enabled |
| Student | create, update, delete, enrollment |
| Teacher | create, update, delete, assignment |
| Attendance | mark, update, delete |
| Exam | create, update, grade-submission, delete |
| Fee | create-invoice, record-payment, delete |
| File | upload, download, delete |
| System | config-change, tenant-create, user-invite |

## 7. Business Rules
- All writes trigger logging (automatic via middleware)
- Logs never editable or deletable
- Retention: 2 years, then archived to cold storage
- Real-time alerts for:
  - Failed login > 5 attempts
  - Fee deletion
  - Exam grade changes after finalization
  - Configuration changes
- Search performance: indexes on userId, action, entity, timestamp

## 8. Security
- Access limited to Super Admin role only
- Audit log access itself generates audit entry
- Logs streamed to external SIEM (optional)