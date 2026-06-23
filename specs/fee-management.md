# Fee Management Module Specification

## 1. Purpose
Manage student fee structures, invoicing, payment processing, discounts, and fine calculation.

## 2. Features
- Fee structure configuration (types, amounts)
- Invoice generation and distribution
- Payment recording (online/offline)
- Discount and scholarship application
- Fine calculation for late payments
- Receipt generation (PDF/email)
- Fee status tracking
- Payment reminders via notifications
- Financial reporting

## 3. User Flows
### Accountant/Admin
1. Define fee structure for academic year
2. Generate invoices for students
3. Record payment transactions
4. Apply discounts/scholarships
5. Calculate and record fines
6. Generate financial reports
7. Send payment reminders

### Parent/Student
1. View fee status & due dates
2. Make online payment
3. Download payment receipts
4. View payment history

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/fees/structures` | ✅ (Accountant/Admin) | Create fee structure |
| GET | `/api/v1/fees/structures` | ✅ | List fee structures |
| POST | `/api/v1/fees/invoices` | ✅ (Accountant) | Generate invoices |
| GET | `/api/v1/fees/invoices` | ✅ | List invoices |
| POST | `/api/v1/fees/payments` | ✅ (Parent) | Record payment |
| GET | `/api/v1/fees/status/:studentId` | ✅ (Parent) | Fee status |
| POST | `/api/v1/fees/discounts` | ✅ (Admin) | Apply discount |
| POST | `/api/v1/fees/fines/calculate` | ✅ (System) | Calculate fines |
| GET | `/api/v1/fees/receipt/:paymentId` | ✅ (Parent) | Download receipt |
| GET | `/api/v1/fees/reports` | ✅ (Accountant) | Financial reports |

## 5. Data Model
```prisma
model FeeStructure {
  id              String   @id @default(uuid())
  schoolId        String
  feeType         FeeType
  amount          Decimal
  dueDay          Int      // Day of month
  isRecurring     Boolean  // Monthly/annual
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([schoolId, feeType])
}

model Invoice {
  id              String   @id @default(uuid())
  studentId       String
  feeStructureId  String
  amountDue       Decimal
  amountPaid      Decimal  @default(0)
  dueDate         DateTime
  status          InvoiceStatus
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([studentId])
  @@index([dueDate])
}

model Payment {
  id              String   @id @default(uuid())
  invoiceId       String
  amount          Decimal
  paymentMethod   String
  payerId         String   // Parent or student ID
  transactionRef  String
  receiptPath     String?  // PDF path
  paidAt          DateTime @default(now())
  schoolId        String
  
  @@index([invoiceId])
  @@index([schoolId, paidAt])
}

model Discount {
  id              String   @id @default(uuid())
  studentId       String
  invoiceId       String?
  discountType    String
  amount          Decimal
  reason          String
  appliedAt       DateTime @default(now())
  
  @@index([studentId])
}

enum FeeType {
  ADMISSION_FEE
  MONTHLY_FEE
  ANNUAL_FEE
  TRANSPORT_FEE
  EXAM_FEE
  OTHER
}

enum InvoiceStatus {
  PENDING
  PARTIAL
  PAID
  OVERDUE
  CANCELLED
}
```

## 6. Validation Rules
- Fee structure amount must be > 0
- Due date cannot be past for new invoices
- Payment amount cannot exceed amount due
- Discount percentage capped at 100%
- Fine calculation occurs only after due date

## 7. Business Logic Rules
- Payment reminders sent 7 days before due, then every 3 days after
- Fine calculation: (days overdue * daily_rate) capped at 10% of fee
- Scholarship discounts auto-applied based on criteria
- Receipt generated automatically on successful payment
- Status transitions: PENDING → PARTIAL → PAID | PENDING → OVERDUE

## 8. Payment Processing
- Integration with payment gateway (Stripe/Paystack)
- Webhook endpoint for payment confirmation
- Handle failed payments with retry logic
- Support for partial payments

## 9. Reporting
- Daily collection summary
- Outstanding balances per class
- Discount/scholarship utilization
- Fine revenue report

## 10. Permissions
| Role | Configure Fees | Generate Invoices | Record Payment | View Reports |
|------|----------------|-------------------|--------------|-------------|
| Super Admin | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ | ✅ | ✅ | ✅ |
| Accountant | ✅ | ✅ | ✅ | ✅ |
| Parent | ❌ | ❌ | ✅ (own child) | ❌ |
| Student | ❌ | ❌ | ✅ (self) | ❌ (own only) |
| Teacher | ❌ | ❌ | ❌ | ❌ |