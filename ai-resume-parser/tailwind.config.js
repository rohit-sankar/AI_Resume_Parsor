/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          accent: "#60A5FA",
        },
        ink: "#0F172A",
        slate: {
          750: "#293548",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(120% 120% at 50% 0%, #EFF6FF 0%, #FFFFFF 55%, #FFFFFF 100%)",
        "blob-gradient":
          "radial-gradient(circle at center, rgba(37,99,235,0.35) 0%, rgba(96,165,250,0.12) 45%, rgba(255,255,255,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37,99,235,0.25)",
        "glow-lg": "0 0 80px rgba(37,99,235,0.35)",
        glass: "0 8px 32px rgba(15,23,42,0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 0.9, transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
