module.exports = {
  purge: {
    content: ['public/*.html'],
    options: {
      safelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    aspectRatio: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
    },
    extend: {
      spacing: {
        'full': '100%'
      },
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
          lightalt: '#CCD3FA',
          light: '#e7edf1',
          DEFAULT: '#323b5a',
          dark: '#323b5a'

        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
