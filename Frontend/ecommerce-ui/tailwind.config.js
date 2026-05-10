/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'earth-bg': '#F0F4F8',     /* Soft cool gray/blue background */
        'earth-text': '#102A43',   /* Deep navy blue text */
        'earth-accent': '#D97706', /* Elegant Amber/Gold accent */
        'earth-green': '#334E68',  /* Muted steel blue (replacing sage) */
        'earth-card': '#FFFFFF',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(16, 42, 67, 0.08)', /* Tinted shadow to match navy */
      }
    },
  },
  plugins: [],
}