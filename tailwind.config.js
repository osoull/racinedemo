/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Amiri', 'serif'],
      },
      colors: {
        brand: {
          primary: '#E63946',    // Red accent
          secondary: '#2B227C',  // Deep purple
          dark: '#1a1648',       // Darker purple
          light: '#F1F5F9',     // Light background
        }
      },
      fontSize: {
        '2xs': '0.625rem',      // 10px
        xs: '0.75rem',          // 12px
        sm: '0.875rem',         // 14px
        base: '1rem',           // 16px
        lg: '1.125rem',         // 18px
        xl: '1.25rem',          // 20px
        '2xl': '1.5rem',        // 24px
        '3xl': '1.875rem',      // 30px
        '4xl': '2.25rem',       // 36px
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}