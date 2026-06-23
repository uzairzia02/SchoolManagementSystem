# UI/UX Guidelines

## 1. Layout System
- **Grid System**: 12-column responsive grid (Bootstrap-like)
- **Breakpoints**:
  - xs (0–576px): 1 column
  - sm (576–768px): 2 columns
  - md (768–992px): 3 columns
  - lg (992–1200px): 4 columns
  - xl (≥1200px): 6 columns
- **Container**: Fixed max-width of 1200px, padding: 1rem

## 2. Component Rules (shadcn/ui)
- **Buttons**:
  - Primary: secondary background with `style="primary"` variant
  - Secondary: default outline
  - Disabled: opacity 0.5
- **Input**: Always paired with `<label>`
- **Modal**: Full-screen overlay, `aria-modal="true"`
- **Drawer**: Left-side slide-in, used for deep navigation
- **Skeleton**: Flicker-free loading states
- **Toast**: Top-right corner, auto-dismiss after 5s

## 3. Typography
- **Font Family**: Inter (Google Fonts) – 400/600 weights
- **Base Size**: 1rem (16px)
- **Headings**:
  - H1: 2rem (32px)
  - H2: 1.5rem (24px)
  - H3: 1.25rem (20px)
  - H4: 1.125rem (18px)
  - H5: 1rem (16px)
  - H6: 0.875rem (14px)
- **Line Height**: 1.5 for body, 1.2 for headings

## 4. Color System
- **Primary**: `#0066CC` (used for accent buttons, links)
- **Secondary**: `#6C757D`
- **Success**: `#28A745`
- **Error**: `#DC3545`
- **Info**: `#17A2B8`
- **Light**: `#F8F9FA`
- **Dark**: `#212529`

### Color Usage
- **Background**: Light (`#FFFFFF`) or Dark (`#121212`)
- **Text**: Default `#212529` on light, `#F8F9FA` on dark
- **Borders**: `#dee2e6` (light) / `#495057` (dark)

## 5. Spacing Scale
- Base unit: `8px` (4px for padding icons, 8px for padding components)
- Multiples: 8px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 112px, 128px
- Used for margins/padding consistently

## 6. Iconography
- **Shadcn Icons**: Single-weight SVG, `aria-hidden="true"`
- **Accessibility**: All icons have invisible aria-label for screen readers
- **Size**: Consistent 24px height/width for action icons

## 7. Empty States
- **Illustrations**: Custom hand-drawn illustrations
- **Illustration Style**: 2‑stroke outlines, muted palette
- **Empty States** always include:
  - Illustration
  - Short description
  - Primary / secondary CTA buttons

## 8. Loading States
- **Skeleton**: Thin border with `background-color` gradient
- **Animated**: Pulsing dots for async load
- **Skeleton Container**: Maintains layout shift prevention

## 9. Accessibility (WCAG 2.1 AA Compliance)
- **Color Contrast**: Minimum 4.5:1 for normal text, 7:1 for large text
- **Keyboard Navigation**: All interactive components focusable via Tab
- **ARIA Labels**: All icons and buttons labeled for screen readers
- **Focus Indicator**: Visible focus ring (2px solid `primary` color)
- **Session Management**: Timeout warnings with accessible alerts

## 10. Design Principles
- **Minimalism**: No decorative elements, focus on readability
- **Consistency**: Identical components across all screens
- **Feedback**: Immediate visual response to user actions
- **Brand Alignment**: Colors and typography reflect elite educational institution

# Design System
```

Now I'll create the design-system.md file.
<tool_call>
<function=Write>
<parameter=content>
# Design System

## 1. Component Library
- **Root Components**: 
  - `Button` (primary/secondary)
  - `Input` (text, email, textarea)
  - `Card` (shadow, rounded corners)
  - `Modal` (overlay)
  - `Table` (striped rows)
  - `Toast` (notification)
  - `Drawer` (side navigation)

## 2. Component Props (TypeScript Types)
```ts
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password';
  error?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
```

## 2. Component Props
- All components receive `aria-label` prop for accessibility.
- Props must be explicitly typed; no `any` usage.

## 2. Component Variants
- All components support dark/light mode via CSS variables.

## 3. Versioning
- Semantic versioning (MAJOR.MINOR.PATCH).
- Deprecation path: major version bump when breaking API changes.

## 4. Contribution Flow
- Fork repository
- Create feature branch
- Submit PR with description
- Pass CI (lint, test, build)
- Review by design system owner

## 3. Documentation Generation
- Auto-generate documentation from TypeScript JSDoc comments.
- Publish to Storybook for visual exploration.

## 4. Iconography
- All icons from `shadcn/ui` component icons.
- Custom icons must be added to `icons/` directory and exported in `index.ts`.

## 5. Asset Management
- All vector illustrations stored in `assets/illustrations/`.
- Images optimized via `sharp` during build.