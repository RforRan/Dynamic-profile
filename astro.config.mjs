import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { portfolioConfig } from './portfolio.config';

const isProd = process.env.NODE_ENV === 'production';

// Tentukan site URL berdasarkan custom domain atau default GitHub Pages
const siteUrl =
  process.env.SITE_URL ||
  portfolioConfig.customDomain ||
  `https://${portfolioConfig.githubUsername}.github.io`;

// Tentukan base path: '/' di lokal dev, atau '/repo-name' di produksi GitHub Pages
const defaultProdBasePath = portfolioConfig.customDomain
  ? '/'
  : `/${portfolioConfig.repositoryName}`;

const basePath = process.env.BASE_PATH ?? (isProd ? defaultProdBasePath : '/');

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [tailwind()],
  output: 'static',
});
