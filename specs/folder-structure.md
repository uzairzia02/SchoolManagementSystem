# Folder Structure (Enterprise Next.js)

```
src/
├─ app/                     # Next.js App Router pages & layouts
│   ├─ (auth)/              # Auth routes
│   ├─ dashboard/           # Protected dashboard pages
│   ├─ api/
│   │   └─ v1/             # Versioned API routes
│   └─ layout.tsx           # Root layout with providers
├─ features/                # Feature-centric modules
│   ├─ auth/
│   │   ├─ api/
│   │   ├─ components/
│   │   ├─ hooks/
│   │   └─ domain/
│   ├─ student-management/
│   ├─ teacher-management/
│   ├─ attendance/
│   ├─ timetable/
│   ├─ examination/
│   ├─ fee-management/
│   └─ … (other modules)
├─ services/                # Cross-cutting services
│   ├─ email/
│   ├─ storage/
│   ├─ audit/
│   └─ notification/
├─ repositories/            # Prisma repositories
├─ middleware/              # Request-level middleware
│   ├─ auth.ts
│   ├─ tenant.ts
│   └─ rate-limit.ts
├─ lib/                    # Utilities & helpers
├─ config/                 # Environment & feature flag config
├─ prisma/
│   ├─ schema.prisma
│   └─ migrations/
├─ public/
│   └─ assets/
└─ types/
    └─ global.d.ts
```

## Folder Purpose
- **app/** – Public pages & API route handlers (Next.js App Router).
- **features/** – Business logic, components, hooks, and domain types grouped by module.
- **services/** – Shared integrations (email, SMS, storage, audit).
- **repositories/** – Prisma wrapper with tenant isolation.
- **middleware/** – Auth, tenant, rate-limiting, request ID injection.
- **prisma/** – ORM schema + migrations.