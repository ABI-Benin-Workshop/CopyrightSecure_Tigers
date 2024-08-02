/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
      },
      colors: {
        primary: "#0f172a",
        secondary: "#55a8fb",
      },
    },
  },
  plugins: [],
};
