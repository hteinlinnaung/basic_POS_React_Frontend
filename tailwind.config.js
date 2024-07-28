import { colors } from "./src/styles/tokens";

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGreen: {
          DEFAULT: '#A3E635',
          dark: '#6DAA2C',
          light: '#CCF882',
        },
        brand: {
          ...colors.brand,
          primary: colors.brand[600],
        },
        error: colors.error,
        accent: {
          ...colors.accent,
          primary: colors.accent[600],
        },
      },
    },
  },
  plugins: [
    
  ],
};


