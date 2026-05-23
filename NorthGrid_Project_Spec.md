# NorthGrid — Sustainable Energy & Mobility Intelligence Platform
## Complete Product & Engineering Specification

---

# 1. Vision

**NorthGrid** is a real-time sustainability intelligence platform built for modern European companies and environmentally conscious individuals.

It combines:
- Real-time Danish energy grid intelligence
- Carbon-aware commute tracking
- Smart energy cost optimization
- Sustainability reporting dashboards
- Human-centered Scandinavian UX
- Enterprise-grade SaaS engineering

The product demonstrates:
- Advanced frontend engineering
- Real-time data systems
- Scalable SaaS architecture
- Data visualization
- Accessibility-first UI engineering
- Polyglot backend thinking
- Production-ready testing & CI/CD

This project is intentionally designed to look like something a Danish product company could realistically build.

---

# 2. Core Product Concept

NorthGrid merges two major sustainability domains into one unified platform:

## A. Grid Intelligence
Users can:
- Monitor Danish electricity prices
- Track live renewable energy production
- View carbon intensity in real time
- Optimize appliance usage timing
- Estimate energy costs and emissions

## B. Sustainable Mobility
Organizations can:
- Track employee commute sustainability
- Measure CO₂ savings from greener transport
- Create sustainability leaderboards
- Generate ESG/CSRD-friendly reports
- Incentivize greener behavior

The platform becomes:
> “A sustainability operating system for energy and mobility.”

---

# 3. Why This Project Stands Out

## Recruiters Immediately See

### Frontend Engineering Depth
- Next.js App Router
- React Server Components
- Advanced client/server boundaries
- Recharts data visualization
- Real-time SWR polling
- Accessibility-first architecture
- Tailwind design systems
- Complex responsive layouts

### Backend & Architecture Thinking
- PostgreSQL schema design
- Drizzle ORM
- RESTful route handlers
- Background computation service
- Data aggregation pipelines
- Cache strategies
- API normalization layers

### Engineering Maturity
- Jest unit testing
- Playwright E2E coverage
- GitHub Actions CI/CD
- Typed contracts
- Error boundaries
- Loading states
- Performance optimization

### Product Thinking
- Real business problem
- Sustainability + CSRD relevance
- Enterprise usability
- Clear UX hierarchy
- Scandinavian product sensibility

---

# 4. Target Users

## Individual Users
- Energy-conscious households
- EV owners
- Sustainability enthusiasts
- Developers & researchers

## Enterprise Users
- Danish SMEs
- Sustainability teams
- HR departments
- ESG reporting teams
- Companies pursuing CSRD compliance

---

# 5. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| State | Zustand |
| Validation | Zod |
| Forms | React Hook Form |
| Realtime Fetching | SWR |
| Testing | Jest |
| E2E | Playwright |
| Hosting | Vercel |
| DB Hosting | Neon / Supabase |
| Icons | Lucide React |
| Billing | Lemon Squeezy |
| Optional Worker | Elixir Phoenix or FastAPI |

---

# 6. System Architecture

```txt
Browser
   ↓
Next.js App Router
   ↓
API Route Handlers
   ├── Energy APIs
   ├── Commute APIs
   ├── Reporting APIs
   └── Billing Webhooks
   ↓
PostgreSQL Database
   ↓
Aggregation Services
   ↓
Background Worker
```

---

# 7. External APIs

## Energinet API
Used for:
- Electricity spot prices
- Carbon intensity
- Renewable production
- Historical energy trends

## Optional APIs
- OpenStreetMap for commute estimation
- Weather API for cycling recommendations
- Public transport APIs

---

# 8. Key Features

# 8.1 Sustainability Dashboard

A unified command center.

## Includes
- Live electricity price card
- Carbon intensity gauge
- Renewable energy donut chart
- Employee sustainability leaderboard
- CO₂ savings overview
- Daily sustainability insights

---

# 8.2 Smart Energy Optimization

Users can:
- See cheapest electricity hours
- Compare current vs ideal usage windows
- Estimate appliance costs
- Estimate emissions
- Track energy efficiency trends

---

# 8.3 Green Commute Tracking

Employees log:
- Cycling
- Walking
- Train
- EV usage
- Public transport

The platform calculates:
- CO₂ saved
- Sustainability score
- Monthly impact
- Organization-wide metrics

---

# 8.4 Enterprise Reporting

Organizations can:
- Export monthly reports
- Track ESG goals
- Generate CSRD-ready summaries
- Compare department sustainability metrics

---

# 8.5 Gamification

Features:
- Green commute streaks
- Team leaderboards
- Sustainability milestones
- Monthly challenges

Gamification is intentionally subtle and professional.

---

# 9. Folder Structure

```txt
northgrid/
├── app/
│   ├── dashboard/
│   ├── energy/
│   ├── mobility/
│   ├── reports/
│   ├── calculator/
│   ├── settings/
│   └── api/
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── energy/
│   ├── mobility/
│   ├── reports/
│   ├── ui/
│   └── layout/
├── hooks/
├── lib/
├── db/
├── types/
├── tests/
├── public/
└── .github/
```

---

# 10. Database Design

## organizations
```ts
id
name
subscriptionTier
monthlyGoal
createdAt
```

## users
```ts
id
organizationId
role
name
email
```

## commute_logs
```ts
id
userId
distance
transportMode
co2Saved
createdAt
```

## energy_snapshots
```ts
id
priceArea
spotPrice
carbonIntensity
renewablePercentage
timestamp
```

---

# 11. Pages

# Dashboard (/dashboard)

Main executive overview.

Includes:
- KPI cards
- Sustainability insights
- Live energy data
- CO₂ graphs
- Leaderboards

---

# Energy (/energy)

Dedicated energy intelligence.

Includes:
- Spot price charts
- Renewable mix
- Carbon gauge
- Cost optimization windows

---

# Mobility (/mobility)

Commute sustainability tracking.

Includes:
- Daily commute logging
- Team rankings
- Weekly trends
- Transport distribution charts

---

# Reports (/reports)

Enterprise sustainability reporting.

Includes:
- Monthly exports
- ESG summaries
- Organization metrics
- CO₂ reduction tracking

---

# Calculator (/calculator)

Real-time appliance and commute impact calculator.

Users can:
- Calculate appliance costs
- Compare carbon savings
- Simulate EV charging timing

---

# 12. Accessibility

The platform follows WCAG 2.1 AA.

Requirements:
- Keyboard navigation
- Focus-visible states
- Semantic HTML
- ARIA labels
- Screen-reader support
- Reduced motion handling
- Minimum contrast ratios

This is critical because European enterprise/public sector buyers heavily evaluate accessibility maturity.

---

# 13. Testing Strategy

## Unit Testing
Jest coverage for:
- Cost calculations
- CO₂ calculations
- Aggregation logic
- Validation functions
- Formatting utilities

## Playwright E2E
Critical flows:
- Dashboard rendering
- Logging commute
- Exporting reports
- Area switching
- Calculator interactions

---

# 14. CI/CD

GitHub Actions:
- Linting
- Type checking
- Unit tests
- Playwright tests
- Coverage reports

Deployment:
- Vercel preview deployments
- Production deployment on merge to main

---

# 15. Performance Strategy

## Techniques
- React Server Components
- Streaming SSR
- Route-level caching
- SWR polling
- Optimistic updates
- Partial hydration
- Lazy-loaded charts

---

# 16. Product Personality

NorthGrid should feel:
- Calm
- Trustworthy
- Intelligent
- Scandinavian
- Data-driven
- Sustainable

The interface should resemble:
> “Professional sustainability infrastructure software.”

Not a startup gimmick dashboard.

---

# 17. Why This Project Is Strong For Denmark

The project directly aligns with:
- Danish sustainability culture
- Energy transparency initiatives
- European ESG trends
- Enterprise SaaS expectations
- Scandinavian design standards

It demonstrates both:
- engineering excellence
- product maturity

This is exactly the type of portfolio project that can start serious conversations with Nordic recruiters.

