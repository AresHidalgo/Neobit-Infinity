/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gaming: {
          primary: '#00ffff',
          accent: '#ff00ff',
          highlight: '#ffff00',
          dark: '#0a0a0a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 15px hsl(var(--primary) / 0.7), 0 0 30px hsl(var(--primary) / 0.5)',
          },
        },
        'random-rotate': {
          '0%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(-5deg)' },
        },
        'gaming-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
          },
          '50%': {
            boxShadow: '0 0 30px #00ffff, 0 0 60px #00ffff, 0 0 80px #00ffff',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'random-rotate': 'random-rotate 3s ease-in-out infinite',
        'gaming-glow': 'gaming-glow 2s ease-in-out infinite',
      },
      gridTemplateColumns: {
        'asymmetric-30-70': '30% 70%',
        'asymmetric-40-60': '40% 60%',
        'asymmetric-60-40': '60% 40%',
        'asymmetric-70-30': '70% 30%',
      },
      columns: {
        'masonry-2': '2',
        'masonry-3': '3',
        'masonry-4': '4',
      },
      boxShadow: {
        'neon-sm': '0 0 5px hsl(var(--primary) / 0.4), 0 0 10px hsl(var(--primary) / 0.2)',
        'neon-md': '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)',
        'neon-lg': '0 0 15px hsl(var(--primary) / 0.7), 0 0 30px hsl(var(--primary) / 0.5)',
        'brutal-inset': 'inset 0 0 0 4px currentColor',
      },
    },
  },
  plugins: [],
};

