# Coding Standards

## 1. Naming Conventions
| Artifact | Convention |
|----------|------------|
| Files | `kebab-case.ts` |
| Folders | `kebab-case/` |
| Components | `PascalCase.tsx` |
| Hooks | `useCamelCase.ts` |
| Types/Interfaces | `PascalCase` (prefix `I` optional) |
| Enums | `PascalCase` (e.g., `Role`, `Gender`) |
| Constants | `UPPER_SNAKE_CASE` |

## 2. TypeScript Standards
- `strict: true` in `tsconfig.json`.
- No `any` types allowed; use `unknown` with type guards where needed.
- Explicitly type all function parameters and return values.
- Use `satisfies` operator for literal type inference.

## 3. Prisma Standards
- All models in `prisma/schema.prisma`.
- Use `@default(uuid())` for primary keys.
- Every model has `createdAt`, `updatedAt`, `deletedAt` timestamps.
- All relations explicitly `onDelete` specified (usually `Cascade` for owned entities, `SetNull` for loose references).

## 4. Server Action Rules
- All Route Handlers validate input with Zod before processing.
- Standardized response format: `ApiResponse<T>` wrapper.
- Handle known errors from Prisma gracefully (`P2002`, `P2025`).

## 5. React Component Rules
- Use Server Components by default; Client Components only for interactivity.
- All UI primitives from **shadcn/ui**.
- Props must have explicit interfaces; destructure all props.
- Keys in lists must be stable (`id` not index).

## 6. Error Handling
- Throw `AppError` with `{ code, message, httpStatus }`.
- Central `errorHandler.ts` middleware maps errors to HTTP responses.
- Never expose stack traces to client.

## 7. Logging
- Use `logger.ts` for structured JSON logging.
- Include `requestId`, `userId`, `role`, `schoolId` in every entry.
- Do not log PII except for audit trails.

## 8. Documentation
- All public functions/classes have JSDoc.
- Inline comments for non-obvious business logic.
- README.md updated for each feature.

## 9. Git Workflow
- Branch naming: `feature/`, `fix/`, `chore/`, `docs/`.
- Conventional commits: `type(scope): description`.
- PR requires 1 reviewer (standard), 2 for breaking changes.