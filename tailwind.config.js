/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#b9ddfe",
          300: "#7cc3fd",
          400: "#38a3f8",
          500: "#0e88eb",
          600: "#0072d6",
          700: "#0059ae",
          800: "#074b8f",
          900: "#0a3c6f",
          950: "#062547",
        },
        secondary: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc170",
          400: "#ff9d37",
          500: "#ff7c0f",
          600: "#f25d04",
          700: "#ca4303",
          800: "#a13509",
          900: "#832e0c",
          950: "#461404",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
