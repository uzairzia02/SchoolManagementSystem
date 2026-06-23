# System Architecture Design

## 1. High-Level Overview
```mermaid
%%{init: {'theme':'default'}}%%
graph TD
    subgraph Frontend
        UI[React (Next.js App Router)]
        UI -->|fetch| API[REST API (/api/v1/)]
        UI -->|websocket?| WS[Realtime Notifications (optional)]
    end
    subgraph Backend
        API -->|ORM| DB[(PostgreSQL – NeonDB)]
        API -->|Auth| Auth[NextAuth (JWT + Session)]
        API -->|Log| Audit[Audit Log Service]
        API -->|Queue| Notif[Notification Service]
        API -->|Store| Files[Secure File Storage]
    end
    DB -->|Replica| DB_R[Read Replica (read-scale)]
    style Frontend fill:#E3F2FD,stroke:#90CAF9
    style Backend fill:#FFF3E0,stroke:#FFB74D
```

## 2. Key Architectural Decisions
| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Multi-tenant with `schoolId`** | Enables a single codebase & DB to serve many schools while preserving data isolation. | Drives every query, requires middleware to inject tenant scope. |
| **Clean Architecture** | Keeps framework concerns (Next.js) separate from business logic, facilitating unit testing and future micro-service migration. | Enforces folder boundaries (`app`, `features`, `domain`). |
| **Server-Components first** | Reduces client bandwidth, improves SEO, centralises data fetching. | Requires data to be serialisable for hydration. |
| **REST API versioned (`/api/v1/`)** | Guarantees backward compatibility and explicit upgrade path. | All clients must reference versioned URLs. |
| **Rate Limiting at API gateway** | Prevents abuse and protects shared resources. | Configured per-user, integrated with Vercel edge functions. |
| **Audit Log as append-only** | Satisfies compliance and supports forensic analysis. | Stored in separate DB table, writes are async via queue. |
| **File storage via signed URLs** | Off-loads large binaries, enforces virus scanning. | Uses S3-compatible bucket; files never touch app server. |

## 3. Service-Layer Scoping Rules (Tenant Isolation)
1. **Middleware** (`/middleware/tenant.ts`) extracts `schoolId` from JWT and attaches to `request.context`.
2. **Repository Layer** (`/repositories`) automatically adds `WHERE schoolId = :schoolId` to every query.
3. **Super-Admin Bypass** – Role `SUPER_ADMIN` can set `schoolId = null` to query across tenants.

## 4. Security Architecture
- **Zero-Trust** – No trusted internal network; every request authenticated.
- **Authentication** – NextAuth with JWT stored in HttpOnly cookie; optional SSO (OAuth2) providers.
- **Authorization** – Central RBAC matrix (`authorization-rbac.md`); enforced in both API middleware and UI route guards.
- **Input Validation** – Zod schemas for every request body, query, and path param.
- **Rate Limiting** – Vercel Edge middleware (`/middleware/rate-limit.ts`).
- **Content Security Policy (CSP)** – Default-src `self`; script-src `self` `unsafe-eval` only for development.
- **Security Headers** – X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.

## 5. Deployment Model
- **Vercel** – Edge-ready static & serverless functions.
- **Database** – Managed PostgreSQL (NeonDB) with read replica.
- **CI/CD** – GitHub Actions deploy to preview; manual promotion to production on merge to `main`.

## 6. Observability
- **Metrics** – Prometheus-compatible counters exported via `/api/v1/metrics`.
- **Tracing** – OpenTelemetry spans across API → Service → Repository.
- **Alerts** – CPU > 80% for > 5 minutes, error rate > 2% → PagerDuty.