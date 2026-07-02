# CRM Dashboard UI System

## 1. UI Architecture
- App shell: left navigation rail, top header, main content canvas.
- Primary experience zones: Dashboard, Leads, Analytics.
- Design language: premium SaaS, linear and Stripe-inspired, with soft surfaces and restrained motion.
- Interaction model: lightweight cards, progressive disclosure, and clear action buttons for lead creation.

## 2. Component Hierarchy
- App Shell
  - Sidebar Navigation
  - Top Navigation Bar
  - Main Content Area
    - Dashboard Page
      - Hero overview card
      - KPI stat cards
      - Pipeline overview
      - Recent leads panel
      - Quick actions
    - Leads Page
      - Page header
      - Search and filter bar
      - Lead table or empty state
      - Lead form modal
    - Analytics Page
      - Filter bar
      - KPI summary cards
      - Charts and trend widgets

## 3. Spacing System
- Base spacing unit: 4px
- Section padding: 24px mobile, 32px desktop
- Card padding: 20px to 24px
- Grid gaps: 16px mobile, 24px desktop
- Vertical rhythm: 24px page sections, 16px internal card spacing

## 4. Color Usage Rules
- Primary: #2563EB for primary actions, links, active states, highlights.
- Success: #22C55E for positive metrics, won states, healthy indicators.
- Warning: #F59E0B for caution states and review prompts.
- Danger: #EF4444 for errors, losses, and destructive actions.
- Background: #F8FAFC for surfaces and app canvas.
- Use dark mode equivalents with slate-based surfaces and high contrast text.

## 5. Page Layouts
### Dashboard
- Header with overview summary and CTA.
- Four KPI cards in a responsive grid.
- Pipeline overview card below.
- Recent leads and quick actions side-by-side on large screens.

### Leads
- Header with title, description, and add lead CTA.
- Search and filter toolbar above the lead list.
- Lead table with clean rows and status chips.
- Modal for add/edit lead forms.

### Analytics
- Top filter bar for time range selection.
- KPI summary cards.
- Two-column chart grid for performance and funnel insights.
- Supporting cards for source analysis and forecast views.
