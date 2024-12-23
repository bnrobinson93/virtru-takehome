/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        background: "#000",
        foreground: "#fff",
        accent: "#001e4a",
        secondary: {
          DEFAULT: "#eaedf1",
          50: '#FFFFFF', 
          100: '#FFFFFF', 
          200: '#FAFCFC', 
          300: '#F7F9FA', 
          400: '#F2F5F7', 
          500: '#eaedf1', 
          600: '#BFCBDB', 
          700: '#8497B5', 
          800: '#546A91', 
          900: '#30446E', 
          950: '#142347'
        },
        primary: {
          DEFAULT: "#001e4a",
          50: '#E9F1F5', 
          100: '#D5E5ED', 
          200: '#9DBDD1', 
          300: '#6E99B8', 
          400: '#265180', 
          500: '#001E4A', 
          600: '#001942', 
          700: '#001438', 
          800: '#000E2B', 
          900: '#000921', 
          950: '#000514'
        },
      },
    },
  },
  plugins: [],
}

