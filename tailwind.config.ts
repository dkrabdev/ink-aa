import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        inkPurple: '#7538F5',
        redMagic: {
          100: '#FF7386',
          400: '#D11D45',
          500: '#F5395E',
        },
        krakenPurple: '#7538F5',
        secondaryPurple: '#7132F5',
        eventPurple: '#B7AAEE',
        gradientPurple: '#8049F2',
        softGradientPurple: '#6D4EAE',
        darkPurple: '#160F1F',
      },
    },
  },
  plugins: [],
};
export default config;
