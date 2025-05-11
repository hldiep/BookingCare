/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#ffffff",
        bar: "#1d2021",
        icon: "#181a1b",
        header: "#0099cc",
        logo: "#FFFF66",
        nav: "#336666",
        footer: "#87CEFF",
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
      },
      animation: {
        buttonHover: "button_hover 1s ease-in-out infinite",
        'fade-in-out': 'fadeInOut 5s ease-in-out forwards',
        'button-hover': 'button_hover 1s ease-in-out forwards',
        shake: 'shake 1s infinite',
      },
    }
  },
  plugins: [],
}

