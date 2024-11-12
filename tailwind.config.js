/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          display: "none",
        },
        "html": {
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        "html::-webkit-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          display: "none",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
