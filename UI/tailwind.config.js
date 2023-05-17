/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(16, minmax(0, 1fr))"

        // Complex site-specific column configuration
      },
      gridTemplateRows: {
        // Simple 8 row grid
        10: "repeat(10, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))"
      },
      gridRow: {
        "span-10": "span 10 / span 10",
        "span-9": "span 9 / span 9"
      },
      gridColumn: {
        "span-16": "span 16 / span 16",
        "span-13": "span 13 / span 13"
      }
    }
  },
  plugins: []
}
