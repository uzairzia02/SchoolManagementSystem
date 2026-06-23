# UI Guidelines

## 1. Layout System
- **Grid**: 12-column fluid grid (CSS Grid)
- **Containers**: Max-width 1280px, centered
- **Spacing**: 8px base unit (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- **Breakpoints**: 
  - xs: < 640px (1 col)
  - sm: 640-768px (2 col)
  - md: 768-1024px (3 col)
  - lg: 1024-1280px (4 col)
  - xl: > 1280px (6 col)

## 2. Typography
- **Font Family**: Inter (variable), fallback: system-ui
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Scale**:
  - Display: 48px / 1.1
  - H1: 36px / 1.2
  - H2: 30px / 1.3
  - H3: 24px / 1.4
  - H4: 20px / 1.4
  - Body: 16px / 1.5
  - Small: 14px / 1.5
  - Caption: 12px / 1.5

## 3. Color Palette
### Light Mode
| Role | Hex | Usage |
|------|-----|-------|
| Primary | #0066CC | Buttons, links, focus |
| Secondary | #6C757D | Muted text, borders |
| Success | #28A745 | Success states |
| Error | #DC3545 | Errors, destructive |
| Warning | #FFC107 | Warnings |
| Background | #FFFFFF | Page background |
| Surface | #F8F9FA | Cards, modals |
| Text Primary | #212529 | Main text |
| Text Muted | #6C757D | Secondary text |

### Dark Mode
| Role | Hex |
|------|-----|
| Primary | #4D9FFF |
| Secondary | #ADB5BD |
| Success | #34D399 |
| Error | #F87171 |
| Warning | #FBBF24 |
| Background | #111827 |
| Surface | #1F2937 |
| Text Primary | #F9FAFB |
| Text Muted | #9CA3AF |

## 4. Components (shadcn/ui)
### Buttons
- **Primary**: `bg-primary text-primary-foreground`
- **Secondary**: `bg-secondary text-secondary-foreground`
- **Outline**: `border border-input`
- **Ghost**: `hover:bg-accent`
- **Destructive**: `bg-destructive text-destructive-foreground`

### Inputs
- **Default**: `border-input focus:ring-ring`
- **Error**: `border-destructive focus:ring-destructive`
- **Label**: Always present, `text-sm font-medium`

### Cards
- **Default**: `bg-card text-card-foreground shadow-sm`
- **Border**: `border border-border`
- **Padding**: `p-6` (default), `p-4` (compact)

### Tables
- **Header**: `bg-muted font-semibold`
- **Row**: `hover:bg-accent/50`
- **Sticky Header**: For scrollable tables
- **Pagination**: `limit` options: 10, 25, 50, 100

### Modals/Dialogs
- **Backdrop**: `bg-black/50`
- **Content**: `bg-background rounded-lg shadow-lg`
- **Focus Trap**: Required
- **Close**: ESC key, click backdrop

## 5. States
### Loading
- **Skeleton**: Pulse animation, matches layout
- **Spinner**: For inline actions
- **Progress**: For determinate operations

### Empty
- **Illustration**: Custom SVG (hand-drawn style)
- **Title**: Descriptive (e.g., "No students yet")
- **Action**: Primary CTA button

### Error
- **Toast**: Top-right, auto-dismiss 5s
- **Inline**: Below field or in form
- **Page**: Full-screen with retry button

### Success
- **Toast**: Green, auto-dismiss 3s
- **Inline**: Checkmark + message

## 6. Accessibility (WCAG 2.1 AA)
- **Contrast**: 4.5:1 minimum for text
- **Focus**: Visible ring (`ring-2 ring-ring`)
- **Keyboard**: All interactive elements reachable
- **ARIA**: Labels, roles, live regions
- **Screen Reader**: Test with NVDA/VoiceOver
- **Skip Link**: "Skip to main content"

## 7. Motion
- **Duration**: 150ms (fast), 250ms (normal)
- **Easing**: `ease-out` for entering, `ease-in` for exiting
- **Reduce Motion**: Respect `prefers-reduced-motion`

## 8. Icons
- **Library**: Lucide React (via shadcn)
- **Size**: 16px (inline), 20px (buttons), 24px (standalone)
- **Color**: `currentColor` (inherits text color)

## 9. Forms
- **Validation**: Real-time (onBlur) + submit
- **Error Display**: Below field, red text + icon
- **Success**: Green checkmark, disable on submit
- **Disabled**: `opacity-50 cursor-not-allowed`

## 10. Navigation
- **Sidebar**: Collapsible, 280px expanded, 72px collapsed
- **Header**: 64px height, sticky
- **Breadcrumbs**: Above page title, clickable
- **Tabs**: Underline variant, keyboard navigable

## 10. Data Display
- **KPI Cards**: Icon + Value + Label + Trend
- **Charts**: Recharts, responsive container
- **Badges**: `bg-muted text-muted-foreground`
- **Avatars**: 32px (small), 48px (medium), 80px (large)