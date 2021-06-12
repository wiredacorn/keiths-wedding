module.exports = {
  purge: {
    content: ['public/*.html'],
    options: {
      safelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Tangerine', 'cursive'],
        'sans': ['Muli', 'notcursive'],
      },
      colors: {
        'tan': {
          DEFAULT: '#c78665'
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
