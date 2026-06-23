# Security Specification

## 1. Threat Model (OWASP Top 10)
| # | Threat | Mitigation |
|---|--------|------------|
| A01:2021 – Broken Access Control | Central RBAC + tenant middleware + UI guards |
| A02:2021 – Cryptographic Failures | TLS 1.3 everywhere, Argon2id password hashing |
| A03:2021 – Injection | Prisma parameterized queries; no string concat |
| A04:2021 – Insecure Design | Security review in every PR; threat modeling quarterly |
| A05:2021 – Security Misconfiguration | CI scans (npm audit, Trivy); Vercel security headers |
| A06:2021 – Vulnerable and Outdated Components | Dependabot alerts; weekly dependency upgrades |
| A07:2021 – Identification and Authentication Failures | NextAuth with secure config; MFA planned |
| A08:2021 – Software and Data Integrity Failures | Code signing planned; audit logs immutable |
| A09:2021 – Security Logging and Monitoring Failures | Central audit log; alerting on anomalies |
| A10:2021 – Server-Side Request Forgery (SSRF) | URL validation for external calls; allowlist |

## 2. Security Controls
- **Transport Security** – Enforced HTTPS (Vercel auto), HSTS header.
- **Password Storage** – Argon2id with salt per user.
- **Session Management** – JWT 1-hour expiry; HttpOnly + Secure + SameSite-Strict.
- **CSRF Protection** – SameSite-Strict cookie; double-submit token for state-changing ops.
- **Input Validation** – Zod schemas for every endpoint and client form.
- **Rate Limiting** – Vercel Edge middleware; 100 req/min/user, 200 burst.
- **Content Security Policy** – `default-src 'self'`; script-src `'self'` (development only).
- **Security Headers** – X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **File Upload Security** – VirusTotal scan; allowed extensions (pdf, docx, png, jpg, zip); max 10 MiB.
- **Audit Logging** – Immutable table; each entry signed with server secret.
- **Backup & Recovery** – Daily snapshots; quarterly restore tests.

## 3. Security Testing
- **Static Analysis** – ESLint security plugin, npm audit.
- **Dynamic Scanning** – OWASP ZAP in CI on staging.
- **Penetration Testing** – External audit annually.
- **Compliance Checks** – GDPR data request workflow semi-annual.

## 4. Incident Response
- **Detection** – Alerts on abnormal login patterns, high error rates, audit log anomalies.
- **Containment** – Ability to disable a tenant instantly via admin console.
- **Eradication** – Revoke compromised JWTs, rotate encryption keys.
- **Recovery** – Restore from last clean backup; post-mortem ADR.