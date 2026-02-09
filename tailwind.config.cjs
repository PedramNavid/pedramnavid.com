const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './public/**/*.html',
        './src/**/*.{astro,js,ts,svelte,mdx,md}'
    ],
    theme: {
        fontFamily: {
            serif: ['Playfair Display', 'Georgia', 'Times New Roman', ...fontFamily.serif],
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', ...fontFamily.sans],
            mono: ['IBM Plex Mono', 'Menlo', 'Monaco', ...fontFamily.mono],
        },
        extend: {
            colors: {
                cream: {
                    50: '#faf8f4',
                    100: '#f5f0ea',
                    200: '#ede5d8',
                    300: '#ddd0bc',
                    400: '#c9b599',
                },
                charcoal: {
                    DEFAULT: '#2c2c2c',
                    light: '#4a4a4a',
                    muted: '#6b6b6b',
                    faint: '#999999',
                },
                coral: {
                    DEFAULT: '#e8735a',
                    dark: '#d4614a',
                    light: '#f0917d',
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: '#2c2c2c',
                        maxWidth: 'none',
                        lineHeight: '1.8',
                        a: {
                            color: '#e8735a',
                            textDecoration: 'none',
                            fontWeight: '500',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                        blockquote: {
                            color: '#4a4a4a',
                            borderLeftColor: '#e8735a',
                            fontStyle: 'normal',
                        },
                        'h1, h2, h3, h4': {
                            color: '#2c2c2c',
                            fontFamily: 'Playfair Display, Georgia, serif',
                            fontWeight: '700',
                        },
                        h1: {
                            fontSize: '2.25rem',
                        },
                        h2: {
                            fontSize: '1.75rem',
                        },
                        h3: {
                            fontSize: '1.375rem',
                        },
                        code: {
                            display: 'inline-block',
                            color: '#2c2c2c',
                            backgroundColor: '#f5f0ea',
                            paddingLeft: '6px',
                            paddingRight: '6px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '0.25rem',
                            fontWeight: '400',
                            fontSize: '0.875em',
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
                            color: '#2c2c2c',
                            fontWeight: '600',
                        },
                        hr: {
                            borderColor: '#ede5d8',
                        },
                    }
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ]
};
