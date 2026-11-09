# Dynamic Developer Portfolio

> Ultra-fast, zero-runtime-JavaScript developer portfolio automatically synchronized from GitHub at build-time using **Astro SSG**, **Tailwind CSS**, and **GitHub Actions**.

[![Deploy Dynamic Portfolio to GitHub Pages](https://github.com/RforRan/Dynamic-profile/actions/workflows/deploy.yml/badge.svg)](https://github.com/RforRan/Dynamic-profile/actions/workflows/deploy.yml)
[![Jamstack SSG](https://img.shields.io/badge/Architecture-Jamstack%20SSG-blue.svg)](https://jamstack.org)
[![Astro](https://img.shields.io/badge/Astro-v5-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC.svg)](https://tailwindcss.com)

---

## ⚡ Panduan Kustomisasi Cepat (Hanya Perlu Edit 1 File!)

Siapa pun yang ingin menggunakan portofolio ini **hanya perlu mengedit 1 file saja**:

👉 **[`portfolio.config.ts`](./portfolio.config.ts)**

Buka file tersebut di text editor dan cukup ubah data berikut:
```typescript
export const portfolioConfig = {
  // 1. Ganti dengan username GitHub dan nama repo Anda
  githubUsername: 'username-anda',
  repositoryName: 'nama-repo-anda',

  // 2. Ganti nama dan bio Anda
  name: 'Nama Anda',
  title: 'FULLSTACK_ENGINEER',
  bio: 'Deskripsi singkat keahlian dan minat Anda.',

  // 3. Tautan media sosial Anda (opsional)
  social: {
    github: 'https://github.com/username-anda',
    linkedin: 'https://linkedin.com/in/username-anda',
    twitter: '',
    email: 'mailto:email@domain.com',
  },
};
```
*Semua bagian website (pemanggilan API GitHub, header, footer, SEO title, dan konfigurasi base path) akan langsung otomatis beradaptasi!*

---

## Architecture Highlights

1. **Zero Client-Side Fetching:** Seluruh pemanggilan GitHub API dijalankan saat proses kompilasi statis (`npm run build`). Browser pengunjung menerima 100% HTML statis tanpa loading spinner dan bebas dari limitasi rate limit IP (60 req/jam).
2. **Graceful Degradation:** Jika API GitHub mengalami gangguan jaringan atau rate limit saat proses build, engine otomatis menggunakan dataset fallback lokal (`src/data/fallback-repos.json`), menjamin build tidak pernah gagal (*zero broken deployment*).
3. **Automated Daily Sync:** GitHub Actions workflow terpasang dengan trigger Cron (`0 0 * * *`) setiap 24 jam sekali serta trigger otomatis pada setiap `push` ke branch `main`.
4. **Impeccable Design Standard:** Mengikuti standar *craft floor* beresolusi tinggi, WCAG 2.1 AA kontras warna, semantic HTML5, keyboard focus rings, dan tata letak responsif mobile-first.

---

## Project Structure

```
Dynamic-profile/
├── portfolio.config.ts          # ⭐️ SATU-SATUNYA FILE YANG PERLU DIEDIT!
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD to GitHub Pages
├── public/
│   ├── favicon.svg              # SVG Favicon
│   └── robots.txt               # SEO Crawler Directive
├── src/
│   ├── components/
│   │   ├── Footer.astro         # Semantic page footer
│   │   ├── Header.astro         # Profile branding & live sync indicator
│   │   ├── ProjectCard.astro    # Repositories card with stars/forks
│   │   └── StatsSummary.astro   # Metrics bar & dynamic project counter
│   ├── data/
│   │   ├── fallback-repos.json  # Offline resilient snapshot
│   │   └── github.ts            # Build-time API engine & filter logic
│   ├── layouts/
│   │   └── Layout.astro         # HTML skeleton & SEO Open Graph metadata
│   ├── pages/
│   │   └── index.astro          # Root page & build-time data integration
│   ├── styles/
│   │   └── global.css           # Tailwind base & custom scrollbar/selection
│   └── types/
│       └── github.ts            # TypeScript data contracts
├── astro.config.mjs             # Astro SSG configuration (membaca portfolio.config.ts)
├── DESIGN.md                    # Impeccable design system specification
├── package.json                 # Project dependencies & scripts
├── PRD.md                       # Product Requirement Document (PRD v1.0.0)
├── PRODUCT.md                   # Product truth & positioning record
├── tailwind.config.mjs          # Tailwind CSS theme extension
└── tsconfig.json                # TypeScript strict config
```

---

## Local Development

```bash
# 1. Clone repository
git clone https://github.com/RforRan/Dynamic-profile.git
cd Dynamic-profile

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Kunjungi `http://localhost:4321` di browser Anda.

---

## Production Build

```bash
# Kompilasi static HTML/CSS/JS ke folder ./dist
npm run build

# Uji coba preview hasil build statis secara lokal
npm run preview
```

---

## GitHub Pages Deployment Setup

1. Buka repositori Anda di GitHub: **Settings** -> **Pages**.
2. Pada bagian **Build and deployment** -> **Source**, pilih **GitHub Actions**.
3. Push perubahan ke branch `main`:
   ```bash
   git add .
   git commit -m "feat: customize portfolio with portfolio.config.ts"
   git push origin main
   ```
4. Pipeline GitHub Actions akan otomatis melakukan kompilasi dan mendeploy web portofolio ke alamat:
   `https://<username>.github.io/<repository-name>/`
