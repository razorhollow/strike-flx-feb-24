import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        straw: '#f2a057',
        burn: '#F26716',
        field: '#732D14',
        dirt: '#1F1008',
        primary: '#FBBF24',
        primaryAccent: '#F59E0B',
        accent: '#222222',
        secondary: '#C4C4C4',
        secondaryAccent: '#9CA3AF',
        background: '#F5F5F5',
        darkPrimary: '#803805',
        darkPrimaryAccent: '#8A3C05',
        darkAccent: '#DEBF79',
        darkSecondary: '#444D5A',
        darkSecondaryAccent: '#4C505C',
        darkBackground: '#0d0d0d',
        text: '#222222',
        darkText: '#F5F5F5',
        darkCard: 'rgba(123, 123, 123, 0.1)'
      },
      backgroundImage: {
        radialDark: "radial-gradient(circle, rgba(28,54,30,1) 1%, rgba(13,13,13,1) 43%)",
      },
    },
  },
  plugins: []
} satisfies Config;
