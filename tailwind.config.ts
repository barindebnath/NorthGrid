import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        borderDefault: "var(--border-default)",
        energy: "var(--accent-energy)",
        green: "var(--accent-green)",
        warning: "var(--accent-warning)",
        danger: "var(--accent-danger)"
      }
    }
  },
  plugins: []
};

export default config;
