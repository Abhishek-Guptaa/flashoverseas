/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'secondary': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        // Main Headings (H1) - Consistent across all pages
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
        'h1-lg': ['3rem', { lineHeight: '1.1', fontWeight: '600' }], // 48px
        'h1-xl': ['3.5rem', { lineHeight: '1.1', fontWeight: '600' }], // 56px
        
        // Section Headings (H2) - Consistent across all pages
        'h2': ['2rem', { lineHeight: '1.3', fontWeight: '600' }], // 32px
        'h2-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
        'h2-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
        
        // Subsection Headings (H3) - Consistent across all pages
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
        'h3-lg': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }], // 28px
        
        // Card/Component Titles (H4) - Consistent across all pages
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
        'h4-lg': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }], // 22px
        
        // Body Text - Consistent across all pages
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        
        // Small Text - Consistent across all pages
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'small-lg': ['0.9375rem', { lineHeight: '1.5', fontWeight: '400' }], // 15px
        
        // Button Text - Consistent across all pages
        'btn': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }], // 14px
        'btn-lg': ['1rem', { lineHeight: '1.4', fontWeight: '500' }], // 16px
      },
      colors: {
        primary: {
            50:  "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)", // #FC3861
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};
