/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" }
        },
        ping: {
          "75%, 100%" : { transform: "scale(2)", opacity: 0, }
        },
      },
      animation: {
        wiggle: "wiggle 500ms ease-in-out",
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) 1",
      }
    }
  },
  plugins: [require("daisyui")],
}
