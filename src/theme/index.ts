import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Brand/Accent colors
        brand: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#93c5fd" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          800: { value: "#1e40af" },
          900: { value: "#1e3a8a" },
          950: { value: "#172554" },
        },
        // Success colors
        success: {
          50: { value: "#ecfdf5" },
          100: { value: "#d1fae5" },
          200: { value: "#a7f3d0" },
          300: { value: "#6ee7b7" },
          400: { value: "#34d399" },
          500: { value: "#10b981" },
          600: { value: "#059669" },
          700: { value: "#047857" },
          800: { value: "#065f46" },
          900: { value: "#064e3b" },
        },
        // Error colors
        error: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          200: { value: "#fecaca" },
          300: { value: "#fca5a5" },
          400: { value: "#f87171" },
          500: { value: "#ef4444" },
          600: { value: "#dc2626" },
          700: { value: "#b91c1c" },
          800: { value: "#991b1b" },
          900: { value: "#7f1d1d" },
        },
        // Background colors
        bg: {
          primary: { value: "#ffffff" },
          secondary: { value: "#f9fafb" },
          tertiary: { value: "#f3f4f6" },
        },
        // Text colors
        text: {
          primary: { value: "#111827" },
          secondary: { value: "#6b7280" },
          muted: { value: "#9ca3af" },
        },
        // Border colors
        border: {
          default: { value: "#e5e7eb" },
          light: { value: "#f3f4f6" },
        },
      },
      fonts: {
        heading: {
          value: "'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif",
        },
        body: {
          value:
            "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        mono: {
          value: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
        },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
      },
      radii: {
        none: { value: "0" },
        sm: { value: "0.25rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        "2xl": { value: "1rem" },
        "3xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },
      shadows: {
        sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        md: {
          value:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        },
        lg: {
          value:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        },
        xl: {
          value:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    semanticTokens: {
      colors: {
        // Primary semantic tokens
        "chakra-body-text": { value: "{colors.text.primary}" },
        "chakra-body-bg": { value: "{colors.bg.primary}" },
        "chakra-border-color": { value: "{colors.border.default}" },
        "chakra-placeholder-color": { value: "{colors.text.muted}" },

        // Brand tokens for easy access
        accent: {
          default: { value: "{colors.brand.600}" },
          emphasized: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.50}" },
          subtle: { value: "{colors.brand.100}" },
        },
      },
    },
    keyframes: {
      fadeIn: {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      fadeInUp: {
        from: { opacity: "0", transform: "translateY(20px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideInRight: {
        from: { opacity: "0", transform: "translateX(-20px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "bg.primary",
      color: "text.primary",
      fontFamily: "body",
      lineHeight: "1.6",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    a: {
      color: "brand.600",
      textDecoration: "none",
      _hover: {
        color: "brand.700",
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
