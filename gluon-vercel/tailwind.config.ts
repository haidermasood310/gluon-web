import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gap: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      padding: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      margin: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      fontFamily: {
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
        // "medium": ["SatoshiMedium", "system-ui", "sans-serif"],
        DEFAULT: "var(--font-inter)",
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        md: "0px 4px 6px -1px rgba(0, 0, 0, 0.06), 0px 2px 4px -1px rgba(0, 0, 0, 0.04)",
        purple: "0px 4px 16.4px 0px rgba(168, 133, 227, 0.80)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        content: "calc(100dvh - 60px)",
      },
      minHeight: {
        "new-email-content": "calc(100vh - 60px - 64px - 100px)",
      },
      width: {
        content: "calc(100dvw)",
        "content-lg": "calc(100dvw - 44px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        red: "#F20823",
        contrast: {
          500: "#F20823",
        },
        gray: {
          100: "#636262",
          150: "#383838",
          170: "#424242",
          350: "#262626",
          400: "#1E1C1C",
        },
        text: {
          primary: "black",
          secondary: "#626060",
        },
        accent: "#DFDFDF",
        description: "#A3A3A3",
        dark: {
          text: "#636262",
          border: "e5e7eb",
          accent: "#211F1F",
          card: "#1E1C1C",
          selected: "#383838",
        },
        light: {
          text: "black",
        },
        content: {
          secondary: "#374151",
          tertiary: "#6B7280",
          disabled: "#9CA3af",
          accent: {
            a: "#A885E3",
          },
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "#F3F4F6",
          tertiary: "#E5E7EB",
          accent: {
            a: "#9467D5",
            "a-light": "#EADCF9",
            "a-disabled": "#D8BFF3",
          },
          primary: {
            disabled: "#D1D5DB",
          },
        },
        border: {
          DEFAULT: "#D1D5DB",
          primary: "#D1D5DB",
          secondary: "#e5e7eb",
          tertiary: "#F3F4F6",
          selected: "#9CA3AF",
          accent: {
            a: "#A885E3",
          },
        },
        purple: {
          200: "#D8BFF3",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
