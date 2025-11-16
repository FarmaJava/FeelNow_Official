/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        feel1: "#3C79A6",
        feel2: "#8DD3FF",
        feel3: "#7BC46B",
        feelBg: "#F7FBFF"
      },
      keyframes: {
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(25px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" }
        },
        write: {
          "0%": { transform: "rotate(-12deg) translateY(0px)" },
          "50%": { transform: "rotate(-10deg) translateY(1px)" },
          "100%": { transform: "rotate(-12deg) translateY(0px)" }
        }
      },
      animation: {
        fadeSlideUp: "fadeSlideUp 1s ease-out forwards",
        write: "write 1.2s infinite ease-in-out"
      }
    },
  },
  safelist: [
    // clases con corchetes o dinámicas que Tailwind puede purgar
    "rotate-[-3deg]",
    "rotate-[-4deg]",
    "rotate-[-12deg]",
    "translate-x-1",
    "translate-y-1",
    "opacity-15",
    "bg-[#8DD3FF55]",
    "bg-[#497c9cff]",
    "bg-[#3C79A6]",
    "bg-[#F7FBFF]",
    "w-56", "h-72", "w-64", "h-80", "md:w-96", "md:h-96"
  ],
  plugins: [],
};
