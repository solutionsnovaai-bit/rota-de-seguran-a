import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        navy: {
          950: '#040B1A',
          900: '#0B1F42',
          850: '#0E2550',
          800: '#122B5A',
          700: '#1A3A73',
          600: '#27508F',
        },
        flame: {
          DEFAULT: '#FA3D0C',
          300: '#FF9A78',
          400: '#FF6A3D',
          500: '#FA3D0C',
          600: '#D93106',
          700: '#AE2604',
        },
        mist: '#86BAEC',
        paper: {
          DEFAULT: '#F3F6FC',
          100: '#F8FAFE',
          200: '#E8EDF7',
          300: '#D6DEEC',
        },
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.4rem, 11vw, 10.5rem)', { lineHeight: '0.86', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.5rem, 6.4vw, 5.75rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.4vw, 3.75rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.25rem, 2.2vw, 1.75rem)', { lineHeight: '1.4', letterSpacing: '-0.012em' }],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        site: '1320px',
      },
      boxShadow: {
        flame: '0 18px 50px -12px rgba(250, 61, 12, 0.55)',
        card: '0 30px 80px -30px rgba(4, 11, 26, 0.55)',
        soft: '0 24px 60px -28px rgba(11, 31, 66, 0.28)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        quint: 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '55%, 100%': { transform: 'translateX(260%) skewX(-20deg)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
      },
      animation: {
        shine: 'shine 3.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
