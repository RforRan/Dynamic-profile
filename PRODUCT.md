# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Astro Framework (SSG), TypeScript, Tailwind CSS, GitHub REST API, GitHub Actions CI/CD (Target: GitHub Pages)

## Users
1. **Developer / Portfolio Owner (`RforRan`):** Software engineer who actively builds open-source projects and needs a portfolio that automatically stays synchronized with GitHub without manual updates or ongoing maintenance.
2. **Tech Recruiter / Client / Engineering Manager:** Evaluators who need to quickly assess code quality, active tech stack, repository descriptions, and project popularity (stars/forks) with instant page load and zero broken links.

## Product Purpose
Dynamic Developer Portfolio eliminates "portfolio rot" by transforming real-world GitHub repositories and activity into an ultra-fast, zero-runtime-JavaScript static website using Jamstack SSG with Astro.

## Positioning
Unlike traditional static portfolios that demand manual content edits or client-side single-page applications (SPAs) that trigger GitHub API rate limit errors (60 req/hr per IP), this architecture moves all data retrieval into CI/CD build-time compilation, serving pure pre-rendered static HTML at CDN edge speeds.

## Operating Context
- Deployed to GitHub Pages (`https://rforran.github.io/Dynamic-profile/` or custom domain).
- Automated daily scheduled synchronization via GitHub Actions Cron (`0 0 * * *`) and on-push triggers.
- Viewed across desktop, tablet, and mobile screens by potential employers, collaborators, and tech communities.

## Capabilities and Constraints
- **Data Ingestion Engine:** Server/Build-time fetch from `https://api.github.com/users/RforRan/repos`.
- **Fault-Tolerant Resilience:** Graceful degradation with fallback data; network failures or rate limits must never crash the build.
- **Deterministic Filter & Sort:** Exclude forks (`!repo.fork`), sort by stargazers count descending, slice to top 100 repositories.
- **Pure SSG Delivery:** Zero client-side API requests, zero client-side JavaScript runtime overhead for portfolio presentation.
- **Pre-Docker Boundary:** No Docker/containerization in this phase; focused on Jamstack static compilation and GitHub Actions.

## Brand Commitments
- Owner Identity: `RforRan` (GitHub: `https://github.com/RforRan`).
- Visual Aesthetic: Impeccable dark mode base, WCAG AA contrast ratio (>= 4.5:1), responsive layout, zero fluff, semantic and authentic developer identity.

## Evidence on Hand
- Comprehensive Product Requirement Document (`PRD.md`).
- Target GitHub Profile: `RforRan`.

## Product Principles
1. **Build-Time Offloading:** Heavy lifting belongs to the CI/CD compiler, not the visitor's mobile browser.
2. **Resilience Over Failure:** Third-party API hiccups degrade gracefully into cached/mock state, keeping deployments continuous.
3. **Authentic Representation:** Real repository metrics, accurate primary languages, and direct source links represent true developer craft.
4. **Impeccable Craft Floor:** Contrast, typography rhythm, semantic HTML, and zero decorative gimmicks.
