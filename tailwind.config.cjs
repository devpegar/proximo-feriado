/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "400px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      backgroundImage: {
        normal:
          "linear-gradient(180deg, rgba(117,170,219,1) 0%, rgba(255,255,255,1) 50%, rgba(117,170,219,1) 100%)",
      },
      colors: {
        "arg-Marron": "#843511",
        "arg-Amarillo": "#fcbf45",
        "arg-Celeste": "#75aadb",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
