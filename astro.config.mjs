import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://rforran.github.io',
  base: process.env.BASE_PATH ?? (isProd ? '/Dynamic-profile' : '/'),
  integrations: [tailwind()],
  output: 'static',
});
