/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * ==============================================================================
 * Cukup edit file ini untuk mempersonalisasi seluruh website portofolio Anda!
 * Semua komponen (Data GitHub API, Header, Footer, SEO, dan Astro Config)
 * akan otomatis menggunakan data yang Anda tuliskan di sini.
 */

export interface PortfolioConfig {
  // 1. Akun & Repositori GitHub (Wajib diisi)
  githubUsername: string;
  repositoryName: string;

  // 2. Identitas & Konten Profil
  name: string;
  title: string;
  bio: string;

  // 3. Tautan Media Sosial & Kontak (Opsional, kosongkan jika tidak ada)
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };

  // 4. Label Teknis HUD & Telemetri
  hud: {
    nodeLocation: string;
    runtimeLabel: string;
    statusLabel: string;
  };

  // 5. Konfigurasi Hosting / Domain
  // Jika menggunakan domain sendiri (misal: 'https://namaanda.com'), isi di sini.
  // Jika menggunakan GitHub Pages bawaan, biarkan kosong ('').
  customDomain: string;
}

export const portfolioConfig: PortfolioConfig = {
  // ============================================================================
  // 1. AKUN GITHUB
  // ============================================================================
  // Username GitHub Anda (data repositori akan diambil secara otomatis dari sini)
  githubUsername: 'RforRan',

  // Nama repositori GitHub proyek ini
  repositoryName: 'Dynamic-profile',

  // ============================================================================
  // 2. IDENTITAS & PROFIL
  // ============================================================================
  // Nama lengkap atau nama panggilan yang ingin Anda tampilkan
  name: 'Randi',

  // Subtitle / spesialisasi teknis di header
  title: 'NEURAL_DEV_PORTFOLIO',

  // Bio / deskripsi ringkas (digunakan juga untuk meta tag SEO)
  bio: 'Software Engineer & Fullstack Developer passionate about high-performance Jamstack, web GIS, and open source.',

  // ============================================================================
  // 3. MEDIA SOSIAL & KONTAK
  // ============================================================================
  social: {
    github: 'https://github.com/RforRan',
    linkedin: '', // Contoh: 'https://linkedin.com/in/username'
    twitter: '',  // Contoh: 'https://x.com/username'
    email: '',    // Contoh: 'mailto:kontak@domain.com'
  },

  // ============================================================================
  // 4. KUSTOMISASI HUD CYBERPUNK (OPSIONAL)
  // ============================================================================
  hud: {
    nodeLocation: 'NODE: AP-SOUTHEAST',
    runtimeLabel: 'RUNTIME: ASTRO.SSG',
    statusLabel: 'SYS.ONLINE',
  },

  // ============================================================================
  // 5. PENGATURAN DOMAIN / HOSTING
  // ============================================================================
  // Biarkan kosong ('') jika Anda menggunakan GitHub Pages standar (username.github.io/repo)
  // Isi URL lengkap jika menggunakan custom domain (contoh: 'https://randi.dev')
  customDomain: '',
};

export default portfolioConfig;
