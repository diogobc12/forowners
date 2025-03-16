/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        pulse: "pulse 1s infinite", // Certifique-se de que "pulse" está no seu tema
        scroll: 'scroll 20s linear infinite'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-200px * 5 - 8rem * 5))' }
        }
      },
    },
  },
  plugins: [],
};
