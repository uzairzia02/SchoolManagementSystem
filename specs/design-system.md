# Design System

## 1. Purpose

This Design System defines reusable UI components, design tokens, interaction patterns, accessibility rules, and implementation standards for the School ERP SaaS platform.

Goals:

- Consistent UI across all modules
- Reusable components
- Faster development
- Better accessibility
- Easier maintenance
- Professional SaaS appearance

---

# 2. Design Principles

- Simplicity over complexity
- Consistency over creativity
- Accessibility first
- Mobile-first responsive design
- Reusable components only
- Performance optimized
- Dark Mode support by default

---

# 3. Component Library (shadcn/ui)

Core Components:

- Button
- Input
- Textarea
- Select
- Combobox
- Checkbox
- Radio Group
- Switch
- Badge
- Avatar
- Card
- Alert
- Alert Dialog
- Modal
- Drawer
- Tabs
- Accordion
- Table
- Data Table
- Pagination
- Tooltip
- Popover
- Dropdown Menu
- Breadcrumb
- Calendar
- Date Picker
- Command Palette
- Skeleton
- Toast
- Progress
- Spinner

---

# 4. Component Standards

Every component MUST support:

- Light Mode
- Dark Mode
- Disabled State
- Loading State
- Error State
- Focus State
- Keyboard Navigation
- Responsive Layout
- Accessibility (ARIA)

---

# 5. Component Props Standards

Every reusable component should follow:

```ts
interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
  "aria-label"?: string
  "data-testid"?: string
}
```

Example Button

```ts
interface ButtonProps extends BaseComponentProps {
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"

  size:
    | "sm"
    | "md"
    | "lg"
    | "icon"

  loading?: boolean

  disabled?: boolean

  onClick?: () => void
}
```

---

# 6. Design Tokens

## Border Radius

- xs = 4px
- sm = 6px
- md = 8px
- lg = 12px
- xl = 16px
- full = 9999px

---

## Spacing Scale

- 4px
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 40px
- 48px
- 64px
- 80px
- 96px

---

## Shadows

Small

Medium

Large

Extra Large

Use Tailwind shadow utilities only.

---

## Z-index Scale

Dropdown

100

Sticky Header

200

Sidebar

300

Drawer

400

Modal

500

Toast

600

---

# 7. Typography

Font Family

Inter

Weights

400

500

600

700

Heading Sizes

H1

36px

H2

30px

H3

24px

H4

20px

H5

18px

H6

16px

Body

16px

Small Text

14px

Caption

12px

---

# 8. Color System

Primary

Blue

Secondary

Slate

Success

Green

Warning

Amber

Danger

Red

Info

Sky Blue

Neutral

Gray Scale

Use Tailwind CSS Variables instead of hardcoded HEX values.

Example

```css
--primary
--secondary
--background
--foreground
--border
--muted
--destructive
```

---

# 9. Form Standards

Every Form MUST include

- Label
- Placeholder
- Validation
- Error Message
- Helper Text
- Required Indicator
- Loading State

Never rely on placeholder as label.

Validation powered by

- React Hook Form
- Zod

---

# 10. Data Table Standards

All tables use TanStack Table.

Required Features

- Pagination
- Sorting
- Search
- Filtering
- Row Selection
- Bulk Actions
- Export CSV
- Export PDF
- Column Visibility
- Responsive Layout

---

# 11. Dashboard Widgets

Standard Cards

- Total Students
- Total Teachers
- Total Fees
- Attendance
- Revenue
- Pending Fees
- Recent Admissions
- Notifications

Charts

- Line Chart
- Bar Chart
- Pie Chart
- Area Chart

Powered by Recharts.

---

# 12. Navigation

Sidebar

- Collapsible
- Icon Support
- Active State
- Nested Menu

Top Navigation

- Search
- Notifications
- User Menu
- Theme Toggle

Breadcrumbs

Every page must include breadcrumbs.

---

# 13. Loading States

Every page must include

- Skeleton Loading
- Spinner
- Empty State
- Error State

Never show blank pages while loading.

---

# 14. Empty States

Every empty state must include

- Illustration
- Title
- Description
- Primary Action
- Secondary Action (optional)

Example

"No Students Found"

Button

Add Student

---

# 15. Feedback Components

Use Toast Notifications

Types

- Success
- Error
- Warning
- Information

Never use browser alerts.

---

# 16. Icons

Use

Lucide Icons

Rules

- 20px
- 24px
- Consistent stroke width
- Accessible labels

No mixed icon libraries.

---

# 17. Accessibility

Must comply with WCAG 2.1 AA

Requirements

- Keyboard Navigation
- Focus Ring
- Screen Reader Labels
- Proper Color Contrast
- Form Labels
- Alt Text
- Accessible Tables

---

# 18. Responsive Design

Breakpoints

sm

640px

md

768px

lg

1024px

xl

1280px

2xl

1536px

Mobile First

Always.

---

# 19. Dark Mode

Support

- Light
- Dark
- System

Persist user preference.

---

# 20. Animations

Use only subtle animations.

Allowed

- Fade
- Slide
- Scale
- Accordion

Duration

150ms–300ms

Avoid excessive animations.

---

# 21. Storybook

Every reusable component must be documented in Storybook.

Documentation includes

- Props
- Variants
- Examples
- Accessibility Notes

---

# 22. Asset Management

Folders

/assets

/icons

/images

/illustrations

Optimize

- SVG
- WebP
- AVIF

---

# 23. Internationalization Ready

Design must support

- RTL Layout
- Multiple Languages
- Variable Text Length
- Date Formats
- Currency Formats
- Time Zones

---

# 24. Print & PDF Ready

Reports should be printable.

Support

- A4
- Letter

Hide navigation while printing.

---

# 25. Versioning

Semantic Versioning

MAJOR.MINOR.PATCH

Breaking UI changes require major version.

---

# 26. Contribution Rules

Every new component must include

- TypeScript Types
- Storybook Story
- Unit Tests
- Accessibility Check
- Dark Mode Support
- Mobile Responsiveness
- Documentation

---

# 27. Future Ready

The Design System is designed to support:

- School ERP
- Parent Portal
- Student Portal
- Teacher Portal
- HRMS
- Finance
- Mobile App
- Multi-Tenant SaaS
- AI Features
- White Label Branding