import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        straw: '#f2a057',
        burn: '#F26716',
        field: '#732D14',
        dirt: '#1F1008'

      }
    },
  },
  plugins: [],
} satisfies Config;
