module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /grid-cols-(none|1|2||3|4|5|6|7|8|9|10|11|12)/,
      variants: ['lg', 'md'],
    },
  ],
  theme: {
    extend: {
      container: {
        padding: '2rem',
        center: true,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
