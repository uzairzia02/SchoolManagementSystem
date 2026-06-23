# Public Website Specification

## 1. Purpose
Create a professional, SEO-optimized marketing website for the School ERP platform.

## 2. Pages
| Page | Route | SEO Keywords |
|------|-------|--------------|
| Home | `/` | School ERP, Management System |
| About | `/about` | About Us, Team |
| Facilities | `/facilities` | Infrastructure, Campus |
| Admissions | `/admissions` | Enroll, Apply |
| Curriculum | `/curriculum` | Courses, Subjects |
| Faculty | `/faculty` | Teachers, Staff |
| Gallery | `/gallery` | Photos, Events |
| News | `/news` | Announcements, Updates |
| Events | `/events` | Calendar, Activities |
| Careers | `/careers` | Jobs, Join Us |
| Contact | `/contact` | Email, Phone |
| FAQ | `/faq` | Questions, Help |
| Login | `/login` | Portal, Sign In |

## 3. SEO Strategy
- **Meta Tags**: Dynamic per page (title, description, OG image)
- **Structured Data**: JSON-LD for Organization, LocalBusiness
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Allow all, sitemap reference
- **Performance**: Next.js Image Optimization, lazy loading

## 4. UI Components
- **Hero Section**: Full-width with CTA
- **Card Grid**: For features/facilities
- **Accordion**: For FAQ
- **Contact Form**: EmailJS or custom backend
- **Event Calendar**: Mini calendar embed
- **Lazy Image**: Masonry grid for gallery

## 5. Technical
- **Static Generation**: Most pages SSG with ISR
- **Dynamic Routes**: News, Events use On-Demand ISR
- **Analytics**: Plausible or GA4 (opt-in)
- **Contact**: Formspree or serverless function

## 6. Responsive Breakpoints
- Mobile (≤ 576px): 1 column
- Tablet (577–768px): 2 columns
- Desktop (> 768px): 3-4 columns

## 7. Dark Mode
- CSS variables for light/dark theme
- Toggle in footer, persistence via `localStorage`

## 8. Performance Targets
- Lighthouse score ≥ 90 (desktop), ≥ 70 (mobile)
- Core Web Vitals: 
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Images: WebP format, lazy loaded below the fold

## 9. Security
- CSP headers for XSS mitigation
- Rate limiting on contact form (5/15min/IP)
- No sensitive data logged

## 10. Deployment
- **Environment**: Vercel
- **Custom Domain**: schoolname.edu or SaaS domain
- **SSL**: Auto (Vercel)
- **Edge Cache**: 5 min TTL for SSG pages