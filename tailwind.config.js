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
        'fancy': ['Cormorant', 'serif'],
      },
      colors: {
        'tan': {
          DEFAULT: '#c78665'
        },
        'lightblue': {
          DEFAULT: '#e5eef1'
        },
        "red": {
          light: '#dcbfc1',
          DEFAULT: '#b78497',
          dark: '#6b3c43',
          
        },
        "blue": {
          light: '#CCD3FA',
          DEFAULT: '#323b5a'

        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
