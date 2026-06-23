# Examination Module Specification

## 1. Purpose
Manage the creation, administration, and evaluation of examinations, quizzes, and assessments.

## 2. Core Features
- Exam creation (exam type: midterm, final, quiz, assignment)
- Assignment of exams to courses/classes
- Student submission of answers (paper‑less via portal)
- Grading & GPA calculation
- Exportable report cards
- Student progress tracking
- Honor‑code enforcement (browser lock, time limits)

## 3. User Flows
### Teacher
1. Create exam (title, type, maxScore, startTime, endTime).
2. Assign exam to a class or specific students.
3. Publish exam instructions & attachment files.
4. Monitor live responses.
5. Close exam after endTime.
6. Generate grading report.

### Student
1. Receive exam notification.
2. Enter exam portal, view questions, submit answers.
3. Receive instant feedback (if configured).
7. Receive graded report card.

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET   | `/api/v1/exams`          | ✅ (Teacher) | List all exams (filterableby class) |
| POST  | `/api/v1/exams`          | ✅ (Teacher) | Create new exam (`CreateExamDTO`) |
| GET   | `/api/v1/exams/:id`      | ✅ (Owner)    | Get exam details |
| PUT   | `/api/v1/exams/:id`      | ✅ (Owner)    | Update exam |
| DELETE| `/api/v1/exams/:id`      | ✅ (Admin)    | Delete exam |
| POST  | `/api/v1/exams/:id/submit` | ✅ (Student) | Submit answers (`ExamSubmissionDTO`) |
| GET   | `/api/v1/exams/:id/grades` | ✅ (Student) | Retrieve grades & feedback |
| POST  | `/api/v1/exams/:id/grades` | ✅ (Teacher) | Enter grades for multiple submissions |
| POST  | `/api/v1/exams/:id/report` | ✅ (Teacher) | Generate printable report (PDF) |

## 5. Database Tables
- `exams` (id, class_id, title, exam_type[enum], maxScore, startTime, endTime, createdAt, updatedAt, deletedAt)
- `exam_submissions` (id, exam_id, student_id, answer_text, submittedAt, gradingStatus, score)
- `grade_records` (id, exam_id, student_id, score, teacher_id, createdAt)
- `exam_files` (id, exam_id, attachment_path, description)

- Constraint: Each exam must be attached to exactly one class (`class_id`).

## 6. Validation Rules
- `exam_type` must be one of: `midterm`, `final`, `quiz`, `assignment`.
- `maxScore` must be positive integer > 0.
- `startTime` < `endTime`.
- `exam_submission` must have `answer_text` max 5000 characters.
- Guard against duplicate exam titles per class.

## 7. Grading Logic
- Raw score = (answeredScore / maxScore) * 100
- Optional curve: add flat offset if class average < 65.
- Grades stored with `A`, `B`, … mapping configurable per school.
- Feedback: teacher can add `feedback_text` stored in `exam_submissions` or separate `feedback` table.

## 7. Security & Fair Use
- Exam portal launches in sandbox iframe with CSP restrictions.
- Time limit enforced: server checks `submittedAt` vs `exam_endTime`; if > allowed, auto‑fail.
- Limit concurrent submissions per class to prevent overload.

## 8. Business Rules
- Autograding only for objective questions; subjective questions require manual grading.
- Honor‑code violation flagged if submission time exceeds allowed duration by > 30 seconds.

## 9. Reporting
- Teacher can export per‑student grades (`/api/v1/exams/:id/grades/export`).
- Principal can export class grade distribution.
- Student can view/download own grade report.

## 10. Testing
- Unit tests for grading logic.
- Integration tests for submission flow with mocked DB.
- E2E tests for exam start->submit->grade workflow.

---  

*All API contracts are described in `api-specification.md`.*