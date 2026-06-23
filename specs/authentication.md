# Authentication Specification

## 1. Overview
Authentication is handled by **NextAuth.js** with the following providers:
- **Credentials** (email + password) – primary method.
- **OAuth2** (Google, Microsoft) – optional SSO for enterprises.

## 2. Session Model
- **JWT** stored in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie.
- Token payload: `{ sub: userId, role, schoolId, exp }`.
- Short-lived JWT (1-hour expiry); no refresh token rotation required.

## 3. Password Policy
- Minimum 12 characters, at least one uppercase, one lowercase, one digit, one special character.
- Stored using **Argon2id** with per-user salt (memory=128MB, iterations=4, parallelism=2).

## 4. Login Flow
1. User posts credentials to `/api/v1/auth/login`.
2. Server validates via Zod schema (`LoginSchema`).
3. Credentials checked against `users` table (Argon2id comparison).
4. On success, JWT issued and set as cookie; `lastLoginAt` updated.
5. Rate limit: 5 failed attempts per 15 min → temporary lockout (15 min).

## 5. Logout Flow
- `POST /api/v1/auth/logout` clears the session cookie.

## 6. OAuth2 Flow (Optional)
1. User clicks "Login with Google/Microsoft".
2. NextAuth redirects to provider; receives auth code.
3. Code exchanged for tokens; user info retrieved.
4. If user exists, log in; else create account and log in.
5. School assignment via admin configuration.

## 7. Security Considerations
- CSRF protection via SameSite-Strict cookie.
- All auth endpoints enforce TLS 1.3.
- Brute-force protection via rate limiting and IP-based lockout.
- Session invalidation on password change.
- Audit log entries for login, logout, failed attempts.

## 8. MFA (Future Enhancement)
- Optional TOTP via authenticator apps (see `future-enhancements.md`).