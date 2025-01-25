const { violet } = require("@radix-ui/colors");
const {
  rose,
  gray,
  red,
  white,
  black,
  transparent
} = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"] // Override default sans font
    },
    colors: {
      ...violet,
      primary: {
        DEFAULT: violet.violet11,
        shade: violet.violet12
      },
      active: {
        DEFAULT: rose[700],
        shade: rose[800]
      },
      danger: {
        DEFAULT: rose[500],
        light: rose[100]
      },
      dark: {
        DEFAULT: gray[900],
        theme: violet.violet9
      },
      medium: {
        DEFAULT: gray[500],
        theme: violet.violet5
      },
      light: {
        DEFAULT: gray[100],
        theme: violet.violet3
      },
      white,
      black,
      transparent
    },
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)"
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" }
        }
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: [require("@tailwindcss/container-queries")]
};
