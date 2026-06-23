# Deployment Specification

## 1. Platform
- **Vercel** – Serverless functions, edge network, automatic previews.
- **NeonDB** – Serverless PostgreSQL with autoscaling.
- **GitHub** – Source control, CI/CD via Actions.

## 2. Environments
| Environment | Purpose | Trigger |
|-------------|---------|---------|
| Preview | Every PR / branch commit | Auto on push |
| Staging | `staging` branch / manual promotion | Manual |
| Production | `main` branch | Manual approval |

## 3. CI/CD Pipeline (GitHub Actions)
```yaml
name: CI/CD
on:
  push:
    branches: [main, feature/**]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint && npx tsc --noEmit

  unit-test:
    needs: lint-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test -- --coverage

  integration-test:
    needs: lint-typecheck
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_PASSWORD: test, POSTGRES_DB: test }
        ports: [5432:5432]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:integration

  e2e-test:
    needs: [unit-test, integration-test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run test:e2e -- --headless

  security-scan:
    needs: unit-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm audit --audit-level=high

  deploy-preview:
    needs: [lint-typecheck, unit-test, integration-test, e2e-test, security-scan]
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with: { vercel-token: ${{ secrets.VERCEL_TOKEN }}, vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}, vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}, vercel-args: '--prod=false' }

  deploy-production:
    needs: [lint-typecheck, unit-test, integration-test, e2e-test, security-scan]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with: { vercel-token: ${{ secrets.VERCEL_TOKEN }}, vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}, vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}, vercel-args: '--prod=true' }
```

## 4. Secrets Management
- All secrets stored in Vercel Environment Variables.
- GitHub Actions secrets for CI tokens.
- Production DB password rotated quarterly.

## 5. Rollback Strategy
- Vercel instant rollback to previous deployment (< 30 s).
- DB migrations backward-compatible; `prisma migrate deploy` is idempotent.
- Feature flags (`config/feature-flags.ts`) to disable features without redeploy.

## 6. Post-Deploy Verification
- Smoke test suite against production URL.
- Health check endpoints: `/api/v1/health`, `/api/v1/ready`.
- Alerting on 5xx errors > 1% for 5 min.