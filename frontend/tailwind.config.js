/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sunset: {
          DEFAULT: '#FF6B35',
          dark: '#E5502A',
          light: '#FF8C5F',
        },
        teal: {
          DEFAULT: '#1B998B',
          dark: '#0B7A75',
          light: '#5FBDB3',
          tint: '#EAF7F5',
        },
        marigold: {
          DEFAULT: '#FFC857',
          dark: '#F2AC1F',
        },
        ink: '#2B2D42',
        cream: '#FFF8F0',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        postcard: '0.75rem',
      },
    },
  },
  plugins: [],
};
