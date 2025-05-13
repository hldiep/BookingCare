/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#ffffff",
        logo: "#b47c2c",
        nav: "#0499c3",
        highlight: "#000099",
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      keyframes: {
        button_hover: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        },
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
          'transform': 'transform',
        },
      },
      animation: {
        buttonHover: "button_hover 1s ease-in-out infinite",
        'fade-in-out': 'fadeInOut 5s ease-in-out forwards',
        'button-hover': 'button_hover 1s ease-in-out forwards',
        shake: 'shake 1s infinite',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
