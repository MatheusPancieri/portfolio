/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        anonymous: ['"Anonymous Pro"', "monospace"],
        cursive: ["PhotographSignature", "cursive"],
        windsong: ["WindSong", "cursive"],
      },
    },
  },
  plugins: [],
};
