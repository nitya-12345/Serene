/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#BDAAFF',
        paleGold: '#F8E7C6',
        cream: '#FFF9F2',
        softGray: '#F5F5F7',
        deepCharcoal: '#111217',
        citrus: '#FFCE6B',
      },
      fontFamily: {
        headline: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
