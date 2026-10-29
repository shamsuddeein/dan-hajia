/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'max-2xl': { max: '1535px' },
      'max-xl': { max: '1279px' },
      'max-lg': { max: '1023px' },
      'max-md': { max: '767px' },
      'max-sm': { max: '639px' },
    },
    extend: {
      colors: {
        // Restrained editorial gold accents
        p1: '#C9A227', // Deep gold (primary accent)
        p2: '#DDBA46', // Lighter gold highlight
        p3: '#A68218', // Rich antique gold
        p4: '#6E550E', // Dark gold rule
        p5: '#362A07', // Deep gold shadow tint

        // Charcoal showroom surfaces & hairline rules
        s1: '#0A0A0B', // Page background (--bg-base)
        s2: '#141416', // Showroom surface (--bg-surface)
        s3: '#1C1C1F', // Elevated card surface (--bg-elevated)
        s4: '#26262B', // Hairline border rule (--border-default)
        s5: '#33333A', // Elevated border / subtle contrast

        // Content & status tokens
        'text-primary': '#F5F2EA',
        'text-muted': '#A3A3AB',
        'state-error': '#E5484D',
        'state-success': '#30A46C',
      },
      backgroundImage: {
        g1: 'linear-gradient(rgba(20, 20, 22, 0.65), rgba(10, 10, 11, 0.85))',
        g2: 'linear-gradient(to top, rgba(10, 10, 11, 0.95), transparent)',
        g3: 'linear-gradient(to right, rgba(201, 162, 39, 0.2), transparent)',
        g4: 'radial-gradient(circle at 50% 0%, rgba(201, 162, 39, 0.15) 0%, transparent 70%)',
        g5: 'linear-gradient(180deg, rgba(201, 162, 39, 0.25) 0%, rgba(20, 20, 22, 0) 100%)',
        g6: 'linear-gradient(to bottom, #1C1C1F, #141416)',
        g7: 'linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.3), transparent)',
        g8: 'linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(28, 28, 31, 0.8) 100%)',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'bento': '2rem',
      },
    },
  },
  plugins: [],
}
