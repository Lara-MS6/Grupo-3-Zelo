/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        zelo: {
          purple: "#4A285B", 
          lilac: "#A370B4",   
          dark: "#1C1C1E",     
          light: "#FDFBFF"    
        }
      }
    },
  },
  plugins: [],
}