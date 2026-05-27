import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette bleue — conservée pour formulaire, success, compte
        brand: {
          50: "#eef4ff",
          100: "#dbe6ff",
          500: "#3b6ef0",
          600: "#2954d8",
          700: "#1f42ad",
          900: "#0f1f55",
        },
        // Tokens landing fintech chaud
        cream: "#f4f0ea",
        paper: "#fffcf7",
        ink:   "#1f1b16",
        accent: {
          DEFAULT: "#c8683b",
          soft:    "#f0e4da",
          deep:    "#4f2f1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["84px", { lineHeight: "0.96", letterSpacing: "-0.035em" }],
        "7xl":  ["72px", { lineHeight: "1",    letterSpacing: "-0.03em"  }],
        "6xl":  ["52px", { lineHeight: "1",    letterSpacing: "-0.03em"  }],
        "5xl":  ["44px", { lineHeight: "1.1",  letterSpacing: "-0.03em"  }],
        "4xl":  ["36px", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "3xl":  ["28px", { lineHeight: "1.2",  letterSpacing: "-0.02em"  }],
        "2xl":  ["24px", { lineHeight: "1.3",  letterSpacing: "-0.01em"  }],
      },
      boxShadow: {
        card:    "0 1px 0 rgba(31,27,22,0.06), 0 24px 60px -32px rgba(31,27,22,0.18)",
        invoice: "0 30px 60px -30px rgba(26,24,21,0.25)",
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
