/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        graphite: {
          DEFAULT: '#0f172a', // Slate 900
          2: '#1e293b',       // Slate 800
          3: '#334155',       // Slate 700
        },
        paper: {
          DEFAULT: '#f8fafc', // Slate 50
          dim: '#cbd5e1',     // Slate 300
        },
        copper: {
          DEFAULT: '#f59e0b', // Amber 500
          bright: '#fbbf24',  // Amber 400
        },
        blue: {
          DEFAULT: '#14b8a6', // Teal 500
          bright: '#2dd4bf',  // Teal 400
        },
        muted: '#64748b',     // Slate 500
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(245, 158, 11, 0.4)',
        'glow-blue': '0 0 15px -3px rgba(20, 184, 166, 0.4)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
