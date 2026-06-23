# Multi-Tenant Architecture & Isolation Strategy

## 1. Tenant Identifier
- Every record contains the column `school_id` (UUID v4).
- `school_id` is **mandatory** for all user-visible tables.

## 2. Request-Level Tenant Resolution
1. JWT includes `schoolId`.
2. Middleware `tenantResolver` extracts `schoolId` and attaches to `request.context`.
3. Prisma middleware (`prisma.$use`) automatically injects `WHERE school_id = :schoolId` into every query.

## 3. Data Isolation Guarantees
| Guarantee | Mechanism |
|-----------|-----------|
| **Logical Isolation** | All queries scoped by `schoolId`. |
| **Physical Isolation (optional)** | Separate schema per tenant can be added later; current design supports it via schema-prefix in Prisma. |
| **Super-Admin Bypass** | Role `SUPER_ADMIN` can set `schoolId = null` to query across tenants. |
| **Row-Level Security (RLS)** | PostgreSQL RLS policies optional for added DB-level safety. |

## 4. Tenant Provisioning Workflow
1. Admin creates a new `School` record via `/api/v1/schools`.
2. System generates a unique `schoolId`.
3. Default configuration (roles, feature toggles) is seeded.
4. Email invitation sent to the first Super Admin of the tenant.

## 5. Migration Path (Future Scaling)
- **Shared tables + school_id** for initial deployment.
- When a tenant exceeds 1 M rows, spin-off to a dedicated schema or separate DB instance via a background migration job.

## 6. Data Retention & Deletion
- **Soft Delete** – `deletedAt` set, data retained for audit.
- **Hard Delete** – Allowed only for `SUPER_ADMIN` after 90 days and with compliance approval.