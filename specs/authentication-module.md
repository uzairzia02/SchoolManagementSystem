# Authentication Module Specification

## 1. Purpose
Provide secure, standards-compliant authentication for all users across tenants.

## 2. Features
- Email/password credentials authentication
- Optional OAuth2 (Google, Microsoft)
- JWT session management with HttpOnly cookie
- Rate limiting on auth endpoints
- Password reset flow (future)
- MFA with TOTP (future)

## 3. User Flows
### Login
1. User enters email/password on `/login`.
2. Client submits to `/api/v1/auth/login`.
3. Server validates, issues JWT, sets cookie.
4. Redirect to role-specific dashboard.

### Logout
1. User clicks logout → `POST /api/v1/auth/logout`.
2. Cookie cleared; redirect to `/login`.

### Session Renewal
- JWT expiry: 1 hour.
- Silent refresh via `POST /api/v1/auth/refresh` before expiry.

## 4. Database Requirements
- `User` table with `email`, `passwordHash`, `role`, `schoolId`.
- Unique index on `email` scoped by `schoolId`.
- `lastLoginAt` timestamp.

## 5. API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | ❌ | Credentials login |
| POST | `/auth/logout | ✅ | Invalidate session | |
| POST | `/auth/refresh` | ✅ | Refresh JWT |

## 6. UI Pages
- `/login` – Credentials + SSO buttons.
- `/forgot-password` – Reset request (future).
- `/reset-password` – New password form (future).

## 7. Permissions (RBAC)
| Role | Login | Logout | Refresh |
|------|-------|--------|---------|
| All | ✅ | ✅ | ✅ |

## 8. Validation Rules
- Email: RFC 5322 format.
- Password: ≥12 chars, 1 upper, 1 lower, 1 digit, 1 special.
- Rate limit: 5 failed attempts / 15 min → 15 min lockout.

## 9. Business Logic Rules
- Password never logged; hashed with Argon2id.
- Session cookie flags: `HttpOnly`, `Secure`, `SameSite=Strict`.
- CSRF: SameSite-Strict provides implicit protection.

## 10. Edge Cases
- Concurrent sessions across browsers → all valid until expiry.
- Password change invalidates all existing sessions.
- Account lockout after 5 failures; admin unlock or wait 15 min.