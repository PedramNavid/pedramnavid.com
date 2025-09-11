const { fontFamily } = require('tailwindcss/defaultTheme')
const config = require('./tailwind.theme.config.cjs')
/**
 * Find the applicable theme color palette, or use the default one
 */
const themeConfig = process.env.THEME_KEY && config[process.env.THEME_KEY] ? config[process.env.THEME_KEY] : config.default
const { colors } = themeConfig
module.exports = {
    darkMode: 'class',
    content: [
        './public/**/*.html',
        './src/**/*.{astro,js,ts}'
    ],
    safelist: ['dark'],
    theme: {
        fontFamily: {
            sans: ['IBM Plex Mono', 'Inter', '-apple-system', 'BlinkMacSystemFont', ...fontFamily.sans],
            mono: ['VT323', 'Fira Code', ...fontFamily.mono],
            pixel: ['Press Start 2P', 'monospace'],
            retro: ['VT323', 'monospace'],
            terminal: ['IBM Plex Mono', 'monospace'],
        },
        extend: {
            colors: {
                theme: {
                    ...colors
                }
            },
            typography: (theme) => ({
                dark: {
                    css: {
                        color: '#b1b4b9',
                        a: {
                            color: '#68aee8',
                            '&:hover': {
                                color: '#79b7eb',
                            },
                        },
                        blockquote: {
                            color: '#b1b4b9',
                            borderLeftColor: '#646568',
                        },
                        'h1, h2, h3, h4': {
                            color: '#dfbe81',
                        },
                        code: {
                            display: 'inline-block',
                            color: '#dfbe81',
                            backgroundColor: '#35373b',
                            paddingLeft: '6px',
                            paddingRight: '6px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
                            borderWidth: '1px',
                            borderColor: '#404247',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        'pre code': {
                            display: 'block',
                            color: '#b1b4b9',
                            backgroundColor: 'transparent',
                            padding: 0,
                            border: 'none',
                        },
                        strong: {
                            color: '#dfbe81',
                        },
                    },
                },
                DEFAULT: {
                    css: {
                        color: theme("colors.gray.700"),
                        maxWidth: 'none',
                        a: {
                            color: theme("colors.blue.600"),
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme("colors.blue.700"),
                                textDecoration: 'underline',
                            },
                        },
                        blockquote: {
                            color: theme("colors.gray.700"),
                            borderLeftColor: theme("colors.gray.300"),
                            fontStyle: 'normal',
                        },
                        'h1, h2, h3, h4': {
                            color: theme("colors.gray.900"),
                            fontWeight: '600',
                        },
                        code: {
                            display: 'inline-block',
                            color: theme("colors.gray.800"),
                            backgroundColor: theme("colors.gray.100"),
                            paddingLeft: '6px',
                            paddingRight: '6px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: 0,
                        },
                        strong: {
                            color: theme("colors.gray.900"),
                            fontWeight: '600',
                        },
                    }
                },
            }),
        },
    },
    variants: {
        extend: { typography: ["dark"] }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ]
};
