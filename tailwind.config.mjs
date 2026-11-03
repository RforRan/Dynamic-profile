/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#090d16',
        surface: {
          DEFAULT: '#0f172a',
          elevated: '#1e293b',
          muted: '#182234',
        },
        signal: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          sky: '#38bdf8',
          amber: '#fbbf24',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"Cascadia Code"',
          '"Fira Code"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
