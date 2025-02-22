/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'facebook': '#1877F2',
          'facebook-hover': '#166FE5',
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
        fontSize: {
          'xxs': '0.625rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '2rem',
        },
        boxShadow: {
          'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
          'dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
      },
    },
    plugins: [],
    darkMode: 'class',
  }