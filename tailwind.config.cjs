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
                        color: theme("colors.gray.300"),
                        a: {
                            color: theme("colors.blue.400"),
                            '&:hover': {
                                color: theme("colors.blue.300"),
                            },
                        },
                        blockquote: {
                            color: theme("colors.gray.300"),
                            borderLeftColor: theme("colors.gray.600"),
                        },
                        'h1, h2, h3, h4': {
                            color: theme("colors.gray.100"),
                        },
                        code: {
                            color: theme("colors.gray.300"),
                        },
                        'pre code': {
                            color: theme("colors.gray.300"),
                        },
                        strong: {
                            color: theme("colors.gray.100"),
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
                            color: theme("colors.gray.800"),
                            backgroundColor: theme("colors.gray.100"),
                            paddingLeft: '4px',
                            paddingRight: '4px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
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
