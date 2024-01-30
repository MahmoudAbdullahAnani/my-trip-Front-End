/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mm: "375px",
        ml: "426px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        ll: "1440px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};
