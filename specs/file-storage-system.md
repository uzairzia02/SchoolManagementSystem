# File Storage System Module Specification

## 1. Purpose
Provide secure, scalable, and compliant file storage for documents, images, and user uploads.

## 2. Features
- **Upload**: Signed URL generation for direct client uploads
- **Virus Scanning**: Integration with VirusTotal or ClamAV
- **Access Control**: Role-based download permissions
- **Retention Policy**: Auto-delete after configurable period
- **Audit Trail**: Log all upload/download actions
- **Storage Tiers**: Standard (recent) + Archive (old)

## 3. User Flows
### User
1. Select file via UI
2. Click "Upload"
3. File sent to signed URL
4. System scans for malware
5. File stored with metadata
6. User receives confirmation

### Admin
1. View storage usage dashboard
2. Set retention policies
3. Force-delete expired files
4. Review audit logs

## 4. API Endpoints (v1)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/files/signed-url` | ✅ (All) | Generate presigned URL for upload |
| POST | `/api/v1/files` | ✅ (All) | Register uploaded file metadata |
| GET | `/api/v1/files/:fileId` | ✅ (Owner) | Download file (signed URL) |
| DELETE | `/api/v1/files/:fileId` | ✅ (Owner) | Soft-delete file |
| GET | `/api/v1/files/my-files` | ✅ (All) | List user's uploaded files |
| GET | `/api/v1/files/audit` | ✅ (Admin) | List file access audit |

## 5. Storage Architecture
- **Provider**: AWS S3 or S3-compatible (MinIO for self-hosted)
- **Folder Structure**: `schoolId/userId/fileId/ext`
- **CDN**: CloudFront or Vercel Edge Cache for public files
- **Metadata**: Stored in PostgreSQL `files` table

## 6. Security Controls
- All uploads require JWT authentication
- Files scanned before public access
- Downloads via signed URLs (expire: 15 min)
- CORS restricted to app domain
- Server-side encryption (SSE-S3)

## 7. Data Model
```prisma
model File {
  id          String   @id @default(uuid())
  userId      String
  schoolId    String
  filename    String
  mimeType    String
  size        Int
  url         String   // S3 key
  uploadedAt  DateTime @default(now())
  deletedAt   DateTime?
  scannedAt   DateTime?
  scanStatus  ScanStatus?
}

enum ScanStatus {
  PENDING
  CLEAN
  INFECTED
  ERROR
}
```

## 8. Business Rules
- Max file size: 10 MB (configurable)
- Allowed MIME types: pdf, doc, docx, xls, xlsx, png, jpg, jpeg, gif
- Files auto-deleted after 365 days (configurable)
- Student/Teacher files: access limited to same school
- Parent files: read-only access to child's files

## 9. Error Handling
- Virus detected: reject upload, notify admin
- Upload failed: retry 3 times, then error
- File not found: 404 with "File may have been deleted"
- Access denied: 403 with "Insufficient permissions"