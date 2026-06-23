# Testing Strategy

## 1. Unit Tests
- **Framework**: Vitest + jsdom + `@testing-library/react`.
- **Coverage Goal**: ≥ 80 % (lines, statements, branches).
- **Scope**: Utility functions, domain logic, Zod schemas.
- **Mocking**: MSW for HTTP; Prisma mock for DB calls.

## 2. Integration Tests
- **Framework**: Jest (or Vitest) with `next-server`.
- **Scope**: API routes, Prisma queries, middleware.
- **Environment**: Dockerised PostgreSQL with test schema.
- **Tenant Isolation**: Verify School A cannot access School B data.

## 3. End-to-End (E2E) Tests
- **Framework**: Playwright.
- **Scenarios**:
  1. Super Admin creates tenant → onboarding flow succeeds.
  2. Teacher marks attendance for class → report generated.
  3. Parent pays fee → receives email receipt.
  4. Student downloads report card PDF.
- **Execution**: GitHub Actions on every PR; headless Chromium.

## 4. Performance Tests
- **Tool**: k6.
- **Scenarios**:
  - 1000 req/min login stress.
  - 500 concurrent attendance submissions.
  - Report generation for 500 students.
- **Metrics**: p95 latency, error %, throughput.

## 5. Security Tests
- **SCA** – `npm audit` in CI.
- **DAST** – OWASP ZAP scan on staging weekly.
- **Pen-Test** – Annual external audit.

## 6. Test Data Management
- Factory pattern (`src/__tests__/factories`) for deterministic fixtures.
- Seed script: `npm run seed:test`.
- Cleanup after each test file with `afterEach`.

## 7. CI Pipeline
```yaml
stages:
  - lint & type-check
  - unit-test (coverage ≥ 80%)
  - integration-test
  - e2e-test
  - security-scan (npm audit, zap)
  - deploy (staging / production)
```

## 8. Quality Gates
- All tests pass.
- Coverage ≥ 80 % (unit).
- No high-severity vulnerabilities.
- Lighthouse score ≥ 90 (desktop), ≥ 70 (mobile).