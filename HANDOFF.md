# HANDOFF — scutilabs site

**State (2026-11-28):** Next.js 16 + Tailwind 4, ru/ro/en. Portfolio is exactly five projects in `src/content/projects/`: CRM (flagship, slug `crm`; old `/crm-portfolio` redirects), Evo ERP, Revenue Workspace, TalentCo Workspace, Automation Hub — all full cards with demo + repo links, written from the repositories. AI PDF Editor and the "in development" placeholders were removed. Home and /portfolio share `PortfolioLayout`: CRM in the centre, two columns of two tiles around it; the catalogue filters were removed.

**Note:** the three academ1cian repos are private; visitors without access get 404 on the "Repository" link.

**Waiting on the owner:**
- Domain → `NEXT_PUBLIC_SITE_URL`; contacts → `NEXT_PUBLIC_CONTACT_EMAIL` / `_TELEGRAM`.

**Checks:** `npm run typecheck`, `npm run build`.
