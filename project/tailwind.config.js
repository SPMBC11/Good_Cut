/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'bitcount-double': ['Bitcount Prop Double', 'sans-serif'],
        'bitcount-single': ['Bitcount Prop Single', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'playwrite': ['Playwrite HU', 'cursive'],
      },
      colors: {
        // Colores principales del tema
        'golden': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4AF37', // Dorado principal
          600: '#B8941F',
          700: '#9A7B0A',
          800: '#7C5A08',
          900: '#5D4206',
        },
        'dark': {
          50: '#F7FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E0',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#1A1A1A', // Negro principal
        },
        'light': {
          50: '#FFFFFF',
          100: '#FAFAFA', // Blanco principal
          200: '#F7FAFC',
          300: '#EDF2F7',
          400: '#E2E8F0',
          500: '#CBD5E0',
        }
      },
    },
  },
  plugins: [],
};
