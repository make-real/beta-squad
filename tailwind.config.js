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
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'customCol': '95px repeat(7, 1fr)',
      },
      gridTemplateRows: {
        // Simple 24 row grid
        '24': 'repeat(24, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
