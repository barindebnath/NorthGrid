# NorthGrid — Unified Design System & UX Specification
## Scandinavian Sustainability Intelligence Design Language

---

# 1. Design Philosophy

NorthGrid follows a design philosophy called:

> “Calm Infrastructure”

The UI should feel:
- precise
- trustworthy
- lightweight
- intelligent
- environmentally conscious

The product merges:
- Scandinavian minimalism
- enterprise SaaS clarity
- data visualization systems
- sustainability-focused UX

The interface should feel like:
> “Mission control for sustainable living and sustainable organizations.”

---

# 2. Design Principles

## 1. Utility Before Decoration
Every visual element must help comprehension.

## 2. Data Is The Hero
Numbers, trends, and insights are central.

## 3. Calm Interfaces Build Trust
Avoid noisy gradients and excessive motion.

## 4. Accessibility Is Mandatory
European enterprise products are expected to meet high accessibility standards.

## 5. Sustainability Should Feel Aspirational
The UI should motivate users without becoming childish or gamified.

---

# 3. Visual Direction

## Style Keywords
- Nordic
- Technical
- Soft enterprise
- Architectural
- Sustainable
- Minimal
- Human-centered

## Inspirations
- Danish transport systems
- Nordic climate dashboards
- Bloomberg terminals
- Linear.app simplicity
- Scandinavian industrial design

---

# 4. Theme Strategy

Unlike the original projects, NorthGrid supports:

- Primary Dark Theme
- Carefully tuned Light Theme

Reason:
Enterprise products often require daytime usability for office environments.

---

# 5. Color System

# Dark Theme

```css
--bg-base: #0d1117;
--bg-surface: #161b22;
--bg-elevated: #1f2937;

--text-primary: #f3f4f6;
--text-secondary: #9ca3af;
--text-muted: #6b7280;

--border-default: #2d3748;

--accent-energy: #60a5fa;
--accent-green: #22c55e;
--accent-warning: #f59e0b;
--accent-danger: #ef4444;
```

# Light Theme

```css
--bg-base: #f8fafc;
--bg-surface: #ffffff;
--bg-elevated: #f1f5f9;

--text-primary: #111827;
--text-secondary: #4b5563;
--text-muted: #6b7280;

--border-default: #d1d5db;

--accent-energy: #2563eb;
--accent-green: #15803d;
--accent-warning: #d97706;
--accent-danger: #dc2626;
```

---

# 6. Typography

## Fonts

| Role | Font |
|---|---|
| Headings | Inter |
| Body | Inter |
| Metrics | JetBrains Mono |

---

# 7. Layout System

## Grid
12-column responsive system.

## Container
```css
max-width: 1440px;
margin: auto;
padding-inline: 24px;
```

---

# 8. Navigation

# Desktop
```txt
[NorthGrid]
Dashboard
Energy
Mobility
Reports
Calculator
Settings
```

# Mobile
Bottom sheet drawer navigation.

---

# 9. Dashboard Layout

## Top Row
- Total CO₂ Saved
- Renewable Grid %
- Current Energy Price
- Active Commuters

## Middle Row
- Carbon intensity chart
- Energy production donut
- Daily commute trends

## Bottom Row
- Leaderboard
- Sustainability insights
- Activity feed

---

# 10. Card System

Cards are the primary UI surface.

## Card Style
```css
border-radius: 16px;
border: 1px solid var(--border-default);
background: var(--bg-surface);
```

## Hover
Subtle elevation only.

No aggressive shadows.

---

# 11. Charts

Charts must:
- prioritize readability
- minimize clutter
- support keyboard accessibility
- work on mobile

## Chart Types

| Feature | Chart |
|---|---|
| Renewable mix | Donut |
| Spot prices | Bar chart |
| Carbon intensity | Area chart |
| Commute trends | Stacked bars |
| Organization rankings | Horizontal bars |

---

# 12. Motion Design

## Motion Philosophy
Motion should:
- communicate state
- reinforce hierarchy
- never distract

## Durations
| Interaction | Duration |
|---|---|
| Hover | 150ms |
| Card enter | 300ms |
| Drawer open | 350ms |
| Chart mount | 500ms |

---

# 13. Accessibility

Requirements:
- WCAG 2.1 AA
- Focus-visible rings
- Keyboard navigation
- Reduced motion support
- ARIA live regions
- High contrast support

---

# 14. Mobile UX

Mobile is critical because:
- commuters log activity on phones
- dashboards may be checked quickly during transit

## Mobile Rules
- Large touch targets
- Sticky primary actions
- Simplified charts
- Reduced visual density

---

# 15. Core UI Components

## Components
- Card
- Badge
- KPI Tile
- Carbon Gauge
- Price Chart
- Commute Logger Drawer
- Area Toggle
- Insight Banner
- Skeleton Loader
- Accessible Tooltip

---

# 16. Insight System

The platform includes human-readable insights such as:

- “Tonight is an ideal EV charging window.”
- “Your organization reduced emissions by 18% this month.”
- “Cycling activity increased 24% this week.”

Insights should feel:
- concise
- actionable
- trustworthy

Never overly conversational.

---

# 17. Empty States

Empty states should guide users.

Example:
```txt
Start logging sustainable commutes to unlock organization insights.
```

---

# 18. Design System Stack

| Layer | Tool |
|---|---|
| Styling | Tailwind CSS |
| Components | Radix UI |
| Icons | Lucide React |
| Charts | Recharts |
| Animation | Framer Motion |

---

# 19. Branding

## Product Name
NorthGrid

## Tagline
“Intelligence for sustainable energy and mobility.”

## Brand Tone
- calm
- precise
- intelligent
- Nordic

---

# 20. Recruiter Impact

The design should communicate:
- product maturity
- accessibility awareness
- enterprise readiness
- Scandinavian UX understanding
- frontend engineering sophistication

A Danish recruiter should immediately feel:
> “This looks like software built for Nordic companies.”

