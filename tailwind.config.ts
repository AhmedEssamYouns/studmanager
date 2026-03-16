import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'secondary-gray': 'var(--secondary-gray)',
        'border-gray': 'var(--border-gray)',
        'text-dark': 'var(--text-dark)',
        'text-gray': 'var(--text-gray)',
        'accent-brown': 'var(--accent-brown)',
        'success-green': 'var(--success-green)',
        'warning-orange': 'var(--warning-orange)',
        'danger-red': 'var(--danger-red)',
        'info-blue': 'var(--info-blue)',
        'pale-yellow': 'var(--pale-yellow)',
        'pale-green': 'var(--pale-green)',
        'pale-orange': 'var(--pale-orange)',
        'pale-red': 'var(--pale-red)',
        'pale-purple': 'var(--pale-purple)',
      },
      fontFamily: {
        sans: ["'SF Pro AR'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
      },
      spacing: {
        '64': '16rem',
      },
    },
  },
  plugins: [],
};

export default config;
