# Grading System Module Specification

## 1. Purpose
Calculate grades, GPA, rank students, and generate report cards consistently across all examination types.

## 2. Core Features
- Assignment of grading scale per school
- GPA calculation (weighted/unweighted)
- Merit list generation
- Report card PDF export
- Bulk grade import/exports
- Academic history timeline

## 3. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/grades/:studentId` | ✅ (Student/Parent) | Get student grades |
| GET | `/api/v1/grades/class/:classId` | ✅ (Teacher) | Get class grades |
| POST | `/api/v1/grades/import` | ✅ (Teacher) | Bulk import grades (CSV) |
| POST | `/api/v1/grades/report/:studentId` | ✅ (Teacher) | Generate PDF report card |
| GET | `/api/v1/grades/gpa` | ✅ (Teacher) | Calculate GPA per class |
| GET | `/api/v1/grades/meritlist/:examId` | ✅ (Teacher) | Generate merit list |

## 4. Database Tables
- `grade_records` (id, exam_id, student_id, score, letter_grade, teacher_id, createdAt)
- `gpa_records` (id, student_id, class_id, gpa, term, year, createdAt)
- `report_cards` (id, student_id, file_path, generatedAt, signedBy)
- `grading_scales` (id, school_id, letter_grade, min_percent, max_percent, createdAt)

## 5. GPA Calculation
- Weighted: credit_hours * score / total_credit_hours
- Unweighted: simple average of letter grades converted to GPA scale
- Scale: A=4.0, A-=3.7, B+=3.3, B=3.0, etc.

## 6. Validation Rules
- Score must be 0–100
- Letter grade must match scale
- Report cards generated only after all exams finalized

## 7. Report Card Template
- Header: School logo, name, address
- Student info: name, class, section, DOB
- Subject-wise grades, max, obtained, letter
- GPA, rank, final grade
- Teacher & principal signature blocks

## 8. Permissions
| Role | View Grades | Export | Merit List |
|------|-------------|--------|------------|
| Teacher | Own class | Own class | Own class |
| Student | Self | Self | ❌ |
| Parent | Child | Child | ❌ |
| Admin | School-wide | School-wide | School-wide |