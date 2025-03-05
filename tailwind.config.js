/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        colorize: "colorize 2s infinite",
      },
      keyframes: {
        colorize: {
          "0%": { filter: "grayscale(100%)", transform: "scale(1)" },
          "50%": { filter: "grayscale(70%)", transform: "scale(1.2)" },
          "100%": { filter: "grayscale(100%)", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
