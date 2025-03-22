/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#02AF08",
        secondary: "#136FFF",
        yellow: "#FFCF47",
        purple: "#FF04F5",
        darkGreen: "#015004",
        lightYellow: "#ECC966",
        darkYellow: "#DA9A36",
        skyBlue: "#8CC5DF",
        darkPink: "#D16A70",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
