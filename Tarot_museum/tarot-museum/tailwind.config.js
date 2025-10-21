/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        vintage: ['Cinzel', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Museum Vintage Color Palette
        museumBlack: '#0a0a0a',
        museumCharcoal: '#1a1a1a',
        museumStone: '#2a2520',
        museumDarkBrown: '#1c1410',
        museumGold: '#D3B77C',
        museumGoldLight: '#E8D4A0',
        museumGoldDark: '#B89860',
        museumAmber: '#e8dcc7',
        museumParchment: '#f5f0e8',
        museumGray: '#4a4a4a',
        museumGrayLight: '#6a6a6a',
        museumGrayDark: '#2a2a2a',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      aspectRatio: {
        'card': '2 / 3',
      },
      screens: {
        'xs': '475px',
      },
      boxShadow: {
        'vintage-sm': '0 2px 4px rgba(0, 0, 0, 0.4)',
        'vintage-md': '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(211, 183, 124, 0.1)',
        'vintage-lg': '0 8px 16px rgba(0, 0, 0, 0.6), 0 0 30px rgba(211, 183, 124, 0.15)',
        'vintage-gold': '0 0 20px rgba(211, 183, 124, 0.3)',
        'vintage-deep': '0 4px 8px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}