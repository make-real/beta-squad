/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeColor: '#BF8AC0',
        sideBarTextColor: '#7088a1',
        deepAqua: '#57BEC7',
      },
    },
  },
  plugins: [],
}
