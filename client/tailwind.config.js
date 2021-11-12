module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "background": "#fffffe",
                "heading": "#2b2c34",
                "paragraph": "#2b2c34",
                "btn-bg": "#6246ea",
                "btn-text": "#fffffe",
                "stroke": "#2b2c34",
                "secondary": "#d1d1e9",
                "tertiary": "#e45858",
                "card-bg": "#d1d1e9",
                "card-heading": "#2b2c34",
                "card-paragraph": "#2b2c34",
                "btn-hover": "#7b62f5",
                "active": "#6246ea",
            }
        },
        screens: {
            'sm': { 'min': '320px', 'max': '480px' },
            'md': { 'min': '481px', 'max': '768px' },
            'lg': { 'min': '769px', 'max': '1024px' },
            'xl': { 'min': '1025px', 'max': '1200px' },
            '2xl': { 'min': '1201px ' },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
            },
        }
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [],
}
