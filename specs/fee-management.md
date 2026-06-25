# Fee Management Module Specification

## 1. Purpose
Manage complete student fee lifecycle including fee structures, invoices, installments, payments, concessions, scholarships, fines, receipts, refunds, financial reporting, and payment notifications.

---

# 2. Features

- Fee Structure Configuration
- Academic Session-wise Fee Plans
- Class-wise Fee Structure
- Student-specific Fee Adjustments
- Monthly / Quarterly / Annual Billing
- Admission Fee
- Registration Fee
- Security Deposit
- Monthly Tuition Fee
- Transport Fee
- Examination Fee
- Library Fee
- Computer Lab Fee
- Science Lab Fee
- Sports Fee
- Hostel Fee (Future)
- Custom Fee Types
- Invoice Generation
- Installment Plans
- Online & Offline Payments
- Partial Payments
- Scholarships
- Discounts & Concessions
- Late Fee / Fine Calculation
- Automatic Receipt Generation
- Payment Reminders
- Refund Management
- Outstanding Balance Tracking
- Financial Reports
- Audit Logs

---

# 3. User Flows

## Accountant / Finance Officer

1. Create Academic Session
2. Configure Fee Structure
3. Generate Monthly Invoices
4. Apply Discounts / Scholarships
5. Record Payments
6. Generate Receipts
7. View Outstanding Dues
8. Generate Reports

---

## Parent

1. Login
2. View Child Fee Details
3. View Pending Invoice
4. Pay Online / Offline
5. Download Receipt
6. View Payment History

---

## Student

1. View Fee Status
2. Download Receipts
3. View Payment History

---

## Principal

1. View Collection Reports
2. View Outstanding Amount
3. View Fee Defaulters
4. View Scholarship Reports

---

# 4. API Endpoints (v1)

| Method | Endpoint | Description |
|----------|-----------------------------|----------------------------|
| POST | /api/v1/fees/structures | Create Fee Structure |
| GET | /api/v1/fees/structures | Get Fee Structures |
| PUT | /api/v1/fees/structures/:id | Update Fee Structure |
| DELETE | /api/v1/fees/structures/:id | Delete Fee Structure |

| POST | /api/v1/fees/invoices | Generate Invoice |
| GET | /api/v1/fees/invoices | List Invoices |
| GET | /api/v1/fees/invoices/:id | Invoice Details |

| POST | /api/v1/fees/payments | Record Payment |
| GET | /api/v1/fees/payments | Payment History |

| POST | /api/v1/fees/refund | Process Refund |

| POST | /api/v1/fees/discounts | Apply Discount |
| POST | /api/v1/fees/concessions | Apply Concession |

| POST | /api/v1/fees/fines/calculate | Calculate Fine |

| GET | /api/v1/fees/reports | Finance Reports |

| GET | /api/v1/fees/receipt/:paymentId | Download Receipt |

---

# 5. Database Models

## FeeStructure

```prisma
model FeeStructure {
  id               String @id @default(uuid())

  schoolId         String
  academicSessionId String

  classId          String?

  feeType          FeeType

  title            String

  amount           Decimal

  dueDay           Int

  billingCycle     BillingCycle

  isRecurring      Boolean

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  deletedAt        DateTime?

  @@index([schoolId])
}
```

---

## Invoice

```prisma
model Invoice {

  id String @id @default(uuid())

  schoolId String

  studentId String

  invoiceNumber String @unique

  totalAmount Decimal

  paidAmount Decimal @default(0)

  remainingAmount Decimal

  fine Decimal @default(0)

  discount Decimal @default(0)

  dueDate DateTime

  status InvoiceStatus

  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt

}
```

---

## Payment

```prisma
model Payment {

  id String @id @default(uuid())

  invoiceId String

  amount Decimal

  paymentMethod PaymentMethod

  transactionReference String?

  paymentStatus PaymentStatus

  paidBy String

  receiptUrl String?

  paidAt DateTime @default(now())

}
```

---

## Discount

```prisma
model Discount {

 id String @id @default(uuid())

 studentId String

 invoiceId String?

 type DiscountType

 amount Decimal

 percentage Decimal?

 reason String

 approvedBy String

}
```

---

## Refund

```prisma
model Refund{

 id String @id @default(uuid())

 paymentId String

 amount Decimal

 reason String

 status RefundStatus

 approvedBy String?

 refundedAt DateTime?

}
```

---

# 6. Enums

## FeeType

```
ADMISSION

REGISTRATION

MONTHLY

ANNUAL

TRANSPORT

EXAM

LIBRARY

COMPUTER_LAB

SCIENCE_LAB

SPORTS

HOSTEL

CUSTOM
```

---

## BillingCycle

```
MONTHLY

QUARTERLY

HALF_YEARLY

YEARLY

ONE_TIME
```

---

## PaymentMethod

```
CASH

BANK_TRANSFER

CHEQUE

CARD

JAZZCASH

EASYPAISA

STRIPE

PAYPAL
```

---

## InvoiceStatus

```
PENDING

PARTIAL

PAID

OVERDUE

CANCELLED

REFUNDED
```

---

## PaymentStatus

```
SUCCESS

FAILED

PENDING

REFUNDED
```

---

# 7. Validation Rules

- Fee amount must be greater than zero.
- Invoice number must be unique.
- Due date cannot be before invoice date.
- Payment cannot exceed remaining balance.
- Discount cannot exceed invoice amount.
- Concession cannot exceed 100%.
- Refund amount cannot exceed paid amount.
- Payment reference must be unique.
- Duplicate invoice generation is prohibited.

---

# 8. Business Rules

- Monthly invoices generated automatically.
- Fine starts after due date.
- Daily fine configurable per school.
- Maximum fine configurable.
- Scholarship auto-applied.
- Sibling concession supported.
- Employee child concession supported.
- Receipt generated automatically after payment.
- Invoice status updates automatically.
- Outstanding balance recalculated after every payment.
- Parent receives reminder:
  - 7 days before due date
  - On due date
  - Every 3 days after overdue
- Every financial transaction creates Audit Log entry.

---

# 9. Payment Processing

Supported Methods

- Cash
- Bank Transfer
- Cheque
- JazzCash
- EasyPaisa
- Stripe
- PayPal

Future

- Apple Pay
- Google Pay

Requirements

- Secure webhook verification
- Retry failed payments
- Partial payment support
- Duplicate transaction prevention

---

# 10. Reports

Financial Reports

- Daily Collection
- Weekly Collection
- Monthly Collection
- Annual Collection
- Outstanding Balance
- Fee Defaulters
- Discount Report
- Scholarship Report
- Fine Collection
- Refund Report
- Payment Method Summary
- Revenue Dashboard

Export Formats

- PDF
- Excel
- CSV

---

# 11. Dashboard KPIs

Accountant Dashboard

- Total Collection
- Pending Collection
- Overdue Amount
- Today's Collection
- Monthly Revenue
- Fine Collected
- Scholarships Given
- Refund Amount

Principal Dashboard

- Fee Collection %
- Outstanding Amount
- Top Defaulter Classes
- Revenue Trend

---

# 12. Notifications

Automatic Notifications

- Invoice Generated
- Payment Received
- Payment Failed
- Receipt Generated
- Fee Reminder
- Overdue Reminder
- Refund Approved

Channels

- In-App
- Email
- WhatsApp (Future)

---

# 13. Security

- RBAC enforced.
- Parents can only access their children's invoices.
- Students can only access their own invoices.
- Every transaction stored in Audit Log.
- Sensitive payment information encrypted.
- PCI-compliant payment gateway integration.
- Transaction IDs are immutable.

---

# 14. Permissions

| Role | Configure Fee | Generate Invoice | Record Payment | Refund | Reports |
|------|---------------|------------------|---------------|---------|----------|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Principal | ✅ | ✅ | ✅ | ✅ | ✅ |
| Accountant | ✅ | ✅ | ✅ | ✅ | ✅ |
| Parent | ❌ | ❌ | ✅ (Own Child) | ❌ | ❌ |
| Student | ❌ | ❌ | ✅ (Self) | ❌ | ❌ |
| Teacher | ❌ | ❌ | ❌ | ❌ | ❌ |

---

# 15. Future Enhancements

- Installment Plans
- Dynamic Fee Rules
- Family Discount Engine
- Multiple Children Combined Invoice
- AI-based Fee Default Prediction
- Multi-Currency Support
- Multi-Campus Finance
- GST/VAT Support
- Accounting Ledger Integration
- QuickBooks Integration
- Xero Integration