
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      "snow" : "#FFFAFA",
      "dark-background" : "#111827"
    }
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["dracula"],
  },
}

