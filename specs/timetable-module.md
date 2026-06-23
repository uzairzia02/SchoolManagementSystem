# Timetable Management Module Specification

## 1. Purpose
Schedule classes, assignments, and resource allocation across teachers, rooms, and time slots.

## 2. Features
- Class/session schedule creation
- Drag‑and‑drop timetable builder (web UI)
- Conflict detection & resolution
- Recurring sessions (e.g., weekly labs)
- Resource assignment (classroom, equipment)
- Export timetable (PDF/CSV)
- Copy semester/year templates

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/schedule/overview` | ✅ (Teacher/Admin/Higher) | Get high‑level schedule view |
| GET | `/api/v1/schedule/assignments` | ✅ (Teacher) | List classes per teacher |
| GET | `/api/v1/schedule/rooms/:roomId` | ✅ (Admin) | Resource calendar for a room |
| POST | `/api/v1/schedule/classes` | ✅ (Admin) | Create new class session |
| PUT | `/api/v1/schedule/classes/:id` | ✅ (Admin) | Update class time/room |
| DELETE | `/api/v1/schedule/classes/:id` | ✅ (Admin) | Delete class |
| GET | `/api/v1/schedule/conflicts` | ✅ (Admin) | Detect overlapping slots across all classes |
| POST | `/api/v1/schedule/export` | ✅ (Role) | Export timetable (JSON/CSV/PDF) |

## 5. Database Stores
- `schedule_events` (event_id, title, type [lecture/lab/extra], start_dt, end_dt, room_id, teacher_id, class_id, school_id, deleted_at)
- `rooms` (room_id, code, capacity, location)
- `class_sessions` (session_id, class_id, event_id, resource_type, resources_used)

- Indexes on `(school_id, start_dt, end_dt)` for fast overlap checks.

## 5. Conflict Detection & Resolution
- Pre‑validate new event against existing events in same time range for same teacher or same room.
- Use ordered query: `SELECT * FROM schedule_events WHERE school_id = :school AND start_dt < :end_dt AND end_dt > :start_dt AND event_id != :id`.
- Returns conflict events with conflict details for UI feedback.

## 6. UI Workflow
- Admin drags‑and‑drops to create events in visual grid.
- Grid shows hour‑blocks per day; color‑coded per class type.
- When dropping, backend checks conflict; if conflict persists shows warning and prevents saving.

## 7. Validation Rules
- Every required class must have at least one session per week.
- Minimum session length 45 minutes; can be split into multiple blocks.
- Rooms must have sufficient capacity for enrolled students.
- Teacher cannot be scheduled for overlapping sessions.
- At least one teacher assigned per class session.

## 8. Data Integrity
- All schedule events linked to a `class` record for consistency.
- Deleting a class automatically cascades delete its schedule events.
- Edit operations perform optimistic locking; version column prevents raced updates.

## 9. Data Retention
- Historical schedule events marked with `deleted_at` retain for audit.
- Export preserves historical version for reporting.

## 10. Permissions
| Role | Access Scope |
|------|--------------|
| Admin | Full CRUD across school |
| Principal | CRUD within school |
| Teacher | Read only (view own schedule) |
| Admin Assistant | CRUD in admin console |