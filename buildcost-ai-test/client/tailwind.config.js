/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#2563eb', // Primary requested #2563EB
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        },
        slateDark: '#0F172A', // Secondary requested #0F172A
        emeraldAccent: '#22C55E', // Accent requested #22C55E
        bgLight: '#F8FAFC', // Background requested #F8FAFC
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        glow: '0 0 25px -5px rgba(37, 99, 235, 0.3)',
      },
    },
  },
  plugins: [],
};
