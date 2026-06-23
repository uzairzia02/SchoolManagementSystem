# Notification System Module Specification

## 1. Purpose
Deliver timely, relevant notifications to users via email, SMS, and in-app channels.

## 2. Features
- **Email Notifications**: Transactional emails via SMTP or service (SendGrid)
- **In-App Notifications**: Real-time via WebSocket or polling
- **Push Notifications**: Browser push for critical alerts (optional)
- **Notification Preferences**: User-controlled opt-in/out per channel
- **Template Engine**: Handlebars templates for consistent messaging
- **Delivery Queue**: Reliable delivery with retry logic
- **Audit Trail**: Log of all sent notifications

## 3. User Flows
### Admin
1. Send announcement to all users
2. Configure notification templates
3. Monitor delivery success rates
### User
1. Receive email on fee payment
2. Get in-app alert for new messages
3. Configure preferences in profile
4. Mark notifications as read

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/notifications` | ✅ (All) | List user notifications (paginated) |
| POST | `/api/v1/notifications/read` | ✅ (All) | Mark notifications as read |
| DELETE | `/api/v1/notifications/:id` | ✅ (All) | Delete notification |
| POST | `/api/v1/notifications/send` | ✅ (Admin) | Send notification to users |
| GET | `/api/v1/notifications/preferences` | ✅ (All) | Get user preferences |
| PUT | `/api/v1/notifications/preferences` | ✅ (All) | Update preferences |

## 5. Data Model
- `notifications` table:
  - `id` (UUID)
  - `userId` (FK)
  - `channel` (email/in-app/push)
  - `title`, `message`
  - `read` (boolean)
  - `actionUrl`
  - `createdAt`
  - `schoolId`

- `notification_preferences` table:
  - `userId`
  - `feeAlerts`, `attendanceAlerts`, `examAlerts`, `announcements` (boolean flags)

## 6. Business Rules
- Default: All notifications enabled
- System notifications (password reset) always sent
- Marketing announcements require explicit opt-in
- Daily digest for low-priority notifications (configurable)
- In-app notifications appear in bell icon with badge count

## 7. Templates
| Template | Trigger | Channel |
|----------|---------|---------|
| welcome-email | New user registration | Email |
| fee-receipt | Payment recorded | Email, In-app |
| attendance-alert | Absence marked | Email, In-app |
| exam-result | Grade published | Email, In-app |
| announcement | Admin broadcast | All channels |
| password-reset | Reset request | Email |

## 8. Edge Cases
- Email bounce → retry with exponential backoff, then mark failed
- User preference change → apply to future notifications only
- Bulk notification → queue with batch processing (100/5s)
- Invalid email → log error, skip, continue with others