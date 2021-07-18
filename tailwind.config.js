module.exports = {
  mode: 'jit',
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
      borderWidth: {
        '12': '12px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '26': '26px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '34': '34px',
        '36': '36px',
        '38': '38px',
        '40': '40px'
      },
      spacing: {
        'full': '100%',
        '80': '80%',
        '75': '75%',
        '60': '60%',
        '50': '50%',
        '3%':'3%',
        '7%':'7%',
        '6%': '6%',
        '17%': '17%'
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
