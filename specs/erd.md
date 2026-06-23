# Entity-Relationship Diagram

```mermaid
erDiagram
    SCHOOL ||--o{ USER : "has"
    SCHOOL ||--o{ STUDENT : "enrolls"
    SCHOOL ||--o{ TEACHER : "employs"
    SCHOOL ||--o{ CLASS : "offers"
    SCHOOL ||--o{ ATTENDANCE : "records"
    SCHOOL ||--o{ EXAM : "conducts"
    SCHOOL ||--o{ FEE : "charges"
    SCHOOL ||--o{ AUDIT_LOG : "stores"

    USER ||--|{ ROLE_ASSIGNMENT : "has"
    ROLE_ASSIGNMENT }|..|{ ROLE : "defines"

    STUDENT ||--o{ ATTENDANCE : "has"
    STUDENT ||--o{ FEE : "pays"
    STUDENT ||--o{ GRADE : "receives"

    TEACHER ||--o{ CLASS : "teaches"
    TEACHER ||--o{ EXAM : "grades"

    CLASS ||--o{ STUDENT : "contains"
    CLASS ||--o{ SCHEDULE : "has"

    EXAM ||--o{ GRADE : "produces"

    FEE ||--o{ PAYMENT : "receives"

    AUDIT_LOG }|..|{ USER : "performed_by"
```

*All tables include `id`, `school_id`, `created_at`, `updated_at`, `deleted_at` (soft delete).*