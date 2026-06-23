# Authorization & RBAC Specification

## 1. Roles & Permissions Matrix

| Role | Dashboard | Student CRUD | Teacher CRUD | Attendance | Exams | Grades | Fees | Reports | Settings | Finance | Admin Tasks |
|------|-----------|--------------|--------------|------------|-------|--------|------|----------|----------|---------|-------------|
| **Super Admin** | ✅ (full) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) | ✅ (all) |
| **Principal** | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ✅ (school) | ❌ |
| **HR** | ✅ (admin) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (payroll) | ❌ | ✅ (manage) | ✅ (manage) | ❌ |
| **Accountant** | ✅ (finance) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (fees) | ❌ | ❌ | ✅ (fees) | ❌ |
| **Teacher** | ✅ (class) | ❌ | ❌ | ✅ (class) | ✅ (class) | ✅ (class) | ❌ | ❌ | ❌ | ✅ (class fees) | ❌ |
| **Faculty** | ✅ (faculty) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Student** | ✅ (self) | ❌ | ❌ | ✅ (self) | ✅ (self) | ✅ (self) | ✅ (self) | ✅ (self) | ❌ | ✅ (own fees) | ❌ |
| **Parent** | ✅ (child) | ❌ | ❌ | ✅ (child) | ✅ (child) | ✅ (child) | ✅ (child) | ✅ (child) | ❌ | ✅ (child fees) | ❌ |

*Icons:*
- ✅ = Full access within scope
- ❌ = Not permitted

## 2. Permission Enforcement Points
1. **API Middleware** – `authorize(role, permission)` checks the JWT role against the matrix.
2. **UI Route Guards** – Higher‑order component `withPermission()` hides UI elements.
3. **Database Row‑Level Checks** – Services verify `schoolId` matches the user’s tenant before write.
4. **Audit Logging** – Every RBAC‑checked write triggers an audit event with `actorId`, `action`, `entity`, `entityId`.

## 3. Permission Design
- Permissions expressed as string constants `entity:action` (e.g., `student:create`, `attendance:read`).
- Matrix stored in `src/authorization/permissions.ts` for easy extension.
- Future support for custom role creation per tenant (see `future-enhancements.md`).

## 3. Audit Event Schema
```json
{
  "actorId": "uuid",
  "actorRole": "string",
  "action": "string",
  "entity": "string",
  "entityId": "uuid",
  "timestamp": "ISO8601",
  "ipAddress": "string"
}
```
- Immutable append‑only storage.
- Signed with server‑side secret.

## 4. Audit Logging Integration
- Every write operation (create, update, delete) fires `auditLog.enqueue(event)`.
- Event processed asynchronously by background job.
- Logs stored in separate `AuditLog` table; each entry signed with secret.

## 5. Future Extensions
- **Dynamic Roles** – Allow tenants to define custom roles.
- **Attribute‑Based Access Control (ABAC)** – For fine‑grained data filters (e.g., restrict certain grades by age).