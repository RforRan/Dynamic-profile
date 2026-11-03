/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#040711',
          asphalt: '#090D18',
          panel: '#0D1322',
          surface: '#11192C',
          border: 'rgba(0, 240, 255, 0.22)',
          'border-active': '#00F0FF',
          yellow: '#FCEE09',
          cyan: '#00F0FF',
          pink: '#FF0055',
          neon: '#39FF14',
          muted: '#52607A',
          subtext: '#8B9BB4',
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
          '"JetBrains Mono"',
          '"Share Tech Mono"',
          'ui-monospace',
          'SFMono-Regular',
          '"Cascadia Code"',
          'monospace',
        ],
        tech: [
          '"Orbitron"',
          '"Share Tech Mono"',
          'monospace',
        ],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.35)',
        'neon-yellow': '0 0 15px rgba(252, 238, 9, 0.35)',
        'neon-pink': '0 0 15px rgba(255, 0, 85, 0.35)',
        'hud-inset': 'inset 0 0 20px rgba(0, 240, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
