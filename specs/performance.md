# Performance Specification

## 1. Service Level Objectives (SLO)
| Metric | Target | Measurement |
|--------|--------|-------------|
| API Latency (p95) | ≤ 300 ms | Synthetic tests (k6) |
| Page Load (first paint) | ≤ 2 s on 3G | Lighthouse CI |
| Availability | 99.9 % monthly | Vercel uptime monitor |
| Error Rate | ≤ 0.5 % of requests | CI health checks |
| DB Query Latency | ≤ 100 ms for indexed queries | PgHero monitoring |

## 2. Optimisation Techniques
- **Server Components first** – Reduces client bundle & data overfetch.
- **Edge Caching** – Vercel CDN for static assets (5 min TTL).
- **Database Indexes** – Composite on `(school_id, date)`, FK indexes on every reference.
- **Pagination** – Max 100 items per page; cursor-based for large tables.
- **Lazy Loading** – Heavy charts/tables loaded via `dynamic()` with loading skeletons.
- **Image Optimisation** – `next/image` with WebP, automatic srcset.
- **Bundle Analysis** – Webpack BundleAnalyzer in CI; fail if > 100 KB page.

## 3. Monitoring & Alerting
- Metrics exported via `/api/v1/metrics` (Prometheus format).
- Dashboards in Grafana for latency, error rate, DB load.
- Alerts:
  - CPU > 80 % for > 5 min → PagerDuty.
  - Error rate > 2 % → Slack.
  - Audit log growth anomalies → Email.

## 4. Capacity Planning
- Vertical scaling via Vercel memory bump (1 GB → 2 GB).
- Horizontal: additional region deployments, DB read replica.
- Background jobs for heavy reports; queue via BullMQ or similar.

## 5. Load Testing
- **Scenarios**:
  - 100 concurrent logins.
  - 1 k concurrent attendance marks.
  - Report generation for 300 students.
- Run weekly on staging; performance gates block deploy.