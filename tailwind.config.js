/** @type {import('tailwindcss').Config} */

const colors = {
  // secondary: "#9AF6C180",\
  secondary: "#00B87D",
  secondary_2: "#00B87D",
  background: "#101014",
  user_interface_1: "#06070D",
  user_interface_2: "#161A1F",
  user_interface_3: "#292F34",
  user_interface_4: "#464E55",
  user_interface_5: "#7B7E82",
  user_interface_6: "#B4B4B4",
  user_interface_7: "#E1E1E1",
  user_interface_8: "#F6F6F6",

  accent_blue: "#5865F2",
  accent_red: "#E54E51",
  shaded: "#8d8d91",
  primary: "#06070D",
  auth_input_background: "#101014",
  input_background: "#505054",

  text: "#F6F6F6",
  text_dull: "#7B7E82",
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        swipe: {
          "0%": {
            transform: " translate(0)",
          },
          "100%": {
            transform: "translate(-100%)",
          },
        },
      },
      animation: {
        swipe: "swipe 1s ease-in-out infinite backwards",
      },
      colors: {
        ...colors,
        current: "currentColor",
        background: "#101014",
        dull: "#96969a",
        primary: {},
        tertiary: {},
        dark: {},
        light: "#fff",
        success: {},
        warning: {},
        danger: {},
        info: {},
        white: {},
        black: {},
      },
      fontFamily: {
        sans: [],
        serif: [],
        mono: [],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
