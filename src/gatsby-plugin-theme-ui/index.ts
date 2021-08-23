const theme = {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#ec008d',
    secondary: '#fff301',
    tertiary: '#40c8f3',
    highlight: '#fb5c2b',
    error: '#fc1b1b',
    success: '#41cd53',
    black: '#000000',
    black1: '#211e21',
    black2: '#251b25',
    black3: '#3d313b',
    black4: '#392e37',
    grey: '#d1d1d1',
    grey1: '#eaeaea',
    grey2: '#f3f2f2',
    grey3: '#f7f7f7',
    grey4: '#cccccc',
    grey5: '#999999',
    three: {
      background: '#000000',
      sphere: '#3d313b',
      marker: '#fff301',
      geometry: '#ec008d',
      graticule: '#392e37',
    },
  },

  fonts: {
    heading: 'GvTime-Regular',
    body: 'system-ui, Roboto-Regular',
    bold: 'system-ui, Roboto-Bold',
    alt: 'Circula-Medium',
  },

  fontWeights: {
    heading: 700,
    body: 400,
    bold: 600,
  },

  lineHeights: {
    heading: '1em',
    body: '1.3em',
    alt: '1em',
  },

  letterSpacings: [
    '0rem',
    '.1rem',
    '.15rem',
    '.25rem',
    '.35rem',
    '.45rem',
    '.55rem',
  ],

  fontSizes: ['.85rem', '1rem', '1.6rem', '2.6rem', '3rem', '5rem', '6.4rem'],

  shadows: {
    card: '0px 0px 30px -2px rgba(0,0,0,0.10)',
    dropdown: '0px 0px 30px -2px rgba(0,0,0,0.10)',
    focus: '0px 0px 1px 3px rgba(0,0,255,0.90)',
  },

  radii: [8, 24, 48],

  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      backgroundColor: 'black',
    },
    header: {
      position: 'fixed',
      width: 'full',
      height: 'header',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'grey1',
      py: 2,
      px: 3,
      backgroundColor: 'background',
      zIndex: 'header',
    },
    main: {
      pt: (theme) => theme.sizes.header,
    },
    a: {
      variant: 'links',
    },
  },

  text: {
    default: {
      lineHeight: 'body',
    },
    small: {
      fontSize: 0,
    },
    heading: {
      h1: {
        fontSize: [5, 6],
        letterSpacing: [5, 6],
        span: {
          '&::before': {
            WebkitTextStrokeWidth: ['10px', '14px'],
          },
        },
      },
      h2: {
        fontSize: [4, 5],
        letterSpacing: [4, 5],
        span: {
          '&::before': {
            WebkitTextStrokeWidth: ['8px', '12px'],
          },
        },
      },
      h3: {
        fontSize: [3, 4],
        letterSpacing: [3, 4],
        '> span:not(:last-child)': {
          mr: ['6px', '10px'],
        },
        span: {
          '&::before': {
            WebkitTextStrokeWidth: ['6px', '10px'],
          },
        },
      },
      h4: {
        fontSize: [2, 3],
        letterSpacing: [2, 3],
        span: {
          '&::before': {
            WebkitTextStrokeWidth: ['6px', '10px'],
          },
        },
      },
      h5: {
        fontSize: 2,
        letterSpacing: 2,
        span: {
          '&::before': {
            WebkitTextStrokeWidth: '7px',
          },
        },
      },
      h6: {
        fontSize: 1,
        letterSpacing: 1,
        span: {
          '&::before': {
            WebkitTextStrokeWidth: '5px',
          },
        },
      },
    },
  },

  links: {
    color: 'primary',
    fontWeight: 'bold',
    nav: {
      fontWeight: 'bold',
      p: 2,
      borderRadius: 0,
      backgroundColor: 'backgroubd',
      transition: '.2s linear background-color, .2s linear color',
      ':hover': {
        backgroundColor: 'grey3',
      },
    },
  },

  buttons: {
    default: {
      borderRadius: 1,
      cursor: 'pointer',
      minWidth: 100,
      mx: 'auto',
      ':hover:not(:disabled)': {
        opacity: 0.9,
      },
      ':focus': {
        outline: 'none',
        boxShadow: 'focus',
      },
      ':disabled': {
        color: 'grey5',
        cursor: 'not-allowed',
        backgroundColor: 'grey1',
      },
    },

    primary: {
      variant: 'buttons.default',
      backgroundColor: 'tertiary',
      color: 'black1',
      fontWeight: 'bold',
    },

    secondary: {
      variant: 'buttons.default',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'primary',
      backgroundColor: 'transparent',
      color: 'primary',
      fontWeight: 'bold',
      ':disabled': {
        color: 'grey5',
        cursor: 'not-allowed',
        backgroundColor: 'black4',
        borderColor: 'black4',
      },
    },

    dropdownItem: {
      variant: 'buttons.default',
      borderRadius: 0,
      backgroundColor: 'grey3',
      color: 'black1',
      mx: 'auto',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  },

  cards: {
    primary: {
      borderRadius: 0,
      px: [3, 4],
      py: 4,
      boxShadow: 'card',
      backgroundColor: 'background',
    },
  },

  forms: {
    textarea: {
      borderRadius: 0,
      borderColor: 'transparent',
      backgroundColor: 'grey2',
      color: 'black',
      fontFamily: 'body',
      p: 3,
      ':focus': {
        outline: 'none',
        boxShadow: 'focus',
      },
    },
    input: {
      borderRadius: 0,
      borderColor: 'transparent',
      backgroundColor: 'grey2',
      color: 'black',
      fontFamily: 'body',
      p: 3,
      ':focus': {
        outline: 'none',
        boxShadow: 'focus',
      },
    },
  },

  images: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
    },
  },

  sizes: {
    container: 1140,
    canvas: 600,
    header: 64,
    avatar: 32,
    full: '100%',
  },

  layout: {
    container: {
      px: [3, 4],
    },
  },

  zIndices: {
    header: 999,
    canvas: -1,
  },
}

export default theme
