module.exports = {
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e6f7ff',
          200: '#bfefff',
          300: '#99e7ff',
          400: '#60d9ff',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        }
      }
    },
  },
  plugins: [],
}
