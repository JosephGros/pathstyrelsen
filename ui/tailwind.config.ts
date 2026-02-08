import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gov: {
          // backgrounds
          bg: '#0F172A', // slate-900
          surface: '#111827', // gray-900
          card: '#1F2937', // gray-800

          // text
          text: '#F1F5F9', // slate-100
          text2: '#CBD5E1', // slate-300
          muted: '#94A3B8', // slate-400

          // borders
          border: '#334155', // slate-700

          // accents
          accent: '#2563EB', // blue-600
          accentHover: '#1D4ED8', // blue-700
          accentSoft: '#3B82F6', // blue-500

          // status
          success: '#16A34A', // green-600
          warning: '#D97706', // amber-600
          danger: '#DC2626', // red-600

          // badge backgrounds (very dark)
          successBg: '#052E16',
          warningBg: '#451A03',
          dangerBg: '#450A0A',

          // badge text (lighter)
          successText: '#86EFAC',
          warningText: '#FCD34D',
          dangerText: '#FCA5A5',
        },
      },
      boxShadow: {
        gov: '0 12px 30px rgba(0,0,0,0.45)',
      },
      borderRadius: {
        phone: '22px',
      },
    },
  },
  plugins: [],
} satisfies Config;
