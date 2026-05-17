import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"DM Sans"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      colors: {
        navy:    '#0e1f38',
        'navy-mid': '#152b4a',
        gold:    '#b8922a',
        'gold-light': '#d4a83a',
        muted:   '#8a9bb0',
        'text-base': '#e8edf3',
        'text-dim':  '#6b7e94',
        green:   '#2a7a4a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
