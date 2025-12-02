/*
Update font, typography variants, palette color based on figma/design
Remove unncessary stuffs
*/

import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import React from 'react';

// Custom theme type extensions
declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1Bold?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    h4Bold?: React.CSSProperties;
    h5Bold?: React.CSSProperties;
    h1SemiBold?: React.CSSProperties;
    h2SemiBold?: React.CSSProperties;
    h3SemiBold?: React.CSSProperties;
    h4SemiBold?: React.CSSProperties;
    h1Medium?: React.CSSProperties;
    h2Medium?: React.CSSProperties;
    h3Medium?: React.CSSProperties;
    h4Medium?: React.CSSProperties;
    titleBold1?: React.CSSProperties;
    titleBold2?: React.CSSProperties;
    titleBold3?: React.CSSProperties;
    titleBold4?: React.CSSProperties;
    titleBold5: React.CSSProperties;
    titleSemiBold1?: React.CSSProperties;
    titleSemiBold2?: React.CSSProperties;
    titleSemiBold3?: React.CSSProperties;
    titleSemiBold4?: React.CSSProperties;
    titleSemiBold5: React.CSSProperties;
    titleMedium1?: React.CSSProperties;
    titleMedium2?: React.CSSProperties;
    titleMedium3?: React.CSSProperties;
    titleMedium4?: React.CSSProperties;
    titleMedium5: React.CSSProperties;
    bodyRegular1: React.CSSProperties;
    bodyRegular2: React.CSSProperties;
    bodyRegular3: React.CSSProperties;
    bodyRegular4: React.CSSProperties;
    bodyRegular5: React.CSSProperties;
    bodyMedium1: React.CSSProperties;
    bodyMedium2: React.CSSProperties;
    bodyMedium3: React.CSSProperties;
    bodyMedium4: React.CSSProperties;
    bodyMedium5: React.CSSProperties;
    bodyBold1: React.CSSProperties;
    bodyBold2: React.CSSProperties;
    bodyBold3: React.CSSProperties;
    bodyBold4: React.CSSProperties;
    bodyBold5: React.CSSProperties;

    titleMediumBold: React.CSSProperties;
    titleMediumProfileBold: React.CSSProperties;
    titleSmallRegular: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h1Bold?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    h4Bold?: React.CSSProperties;
    h5Bold?: React.CSSProperties;
    h1SemiBold?: React.CSSProperties;
    h2SemiBold?: React.CSSProperties;
    h3SemiBold?: React.CSSProperties;
    h4SemiBold?: React.CSSProperties;
    h1Medium?: React.CSSProperties;
    h2Medium?: React.CSSProperties;
    h3Medium?: React.CSSProperties;
    h4Medium?: React.CSSProperties;
    titleBold1?: React.CSSProperties;
    titleBold2?: React.CSSProperties;
    titleBold3?: React.CSSProperties;
    titleBold4?: React.CSSProperties;
    titleBold5: React.CSSProperties;
    titleSemiBold1?: React.CSSProperties;
    titleSemiBold2?: React.CSSProperties;
    titleSemiBold3?: React.CSSProperties;
    titleSemiBold4?: React.CSSProperties;
    titleSemiBold5: React.CSSProperties;
    titleMedium1?: React.CSSProperties;
    titleMedium2?: React.CSSProperties;
    titleMedium3?: React.CSSProperties;
    titleMedium4?: React.CSSProperties;
    titleMedium5: React.CSSProperties;
    bodyRegular1: React.CSSProperties;
    bodyRegular2: React.CSSProperties;
    bodyRegular3: React.CSSProperties;
    bodyRegular4: React.CSSProperties;
    bodyRegular5: React.CSSProperties;
    bodyMedium1: React.CSSProperties;
    bodyMedium2: React.CSSProperties;
    bodyMedium3: React.CSSProperties;
    bodyMedium4: React.CSSProperties;
    bodyMedium5: React.CSSProperties;
    bodyBold1: React.CSSProperties;
    bodyBold2: React.CSSProperties;
    bodyBold3: React.CSSProperties;
    bodyBold4: React.CSSProperties;
    bodyBold5: React.CSSProperties;

    titleMediumBold: React.CSSProperties;
    titleMediumProfileBold: React.CSSProperties;
    titleSmallRegular: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Bold: true;
    h2Bold: true;
    h3Bold: true;
    h4Bold: true;
    h5Bold: true;
    h1SemiBold: true;
    h2SemiBold: true;
    h3SemiBold: true;
    h4SemiBold: true;
    h5SemiBold: true;
    h1Medium: true;
    h2Medium: true;
    h3Medium: true;
    h4Medium: true;
    titleBold1: true;
    titleBold2: true;
    titleBold3: true;
    titleBold4: true;
    titleBold5: true;
    titleSemiBold1: true;
    titleSemiBold2: true;
    titleSemiBold3: true;
    titleSemiBold4: true;
    titleSemiBold5: true;
    titleMedium1: true;
    titleMedium2: true;
    titleMedium3: true;
    titleMedium4: true;
    titleMedium5: true;
    bodyRegular1: true;
    bodyRegular2: true;
    bodyRegular3: true;
    bodyRegular4: true;
    bodyRegular5: true;
    bodyMedium1: true;
    bodyMedium2: true;
    bodyMedium3: true;
    bodyMedium4: true;
    bodyMedium5: true;
    bodyBold1: true;
    bodyBold2: true;
    bodyBold3: true;
    bodyBold4: true;
    bodyBold5: true;

    titleMediumBold: true;
    titleMediumProfileBold: true;
    titleSmallRegular: true;
  }
}

// Define common theme settings structure, but make typography a function
export const commonThemeSettings: ThemeOptions = {
  breakpoints: {
    values: {
      // xxs: 360,
      xs: 375,
      // xs1: 390,
      sm: 744,
      // sm1: 834,
      md: 1024,
      // md1: 1133,
      lg: 1194,
      // lg1: 1280,
      xl: 1366,
      // xl2: 1650,
      // xxl: 1920,
    },
  },
  // Typography defined as a function receiving the palette (as expected by createTheme type)
  typography: {
    h1Bold: {
      fontFamily: 'Roboto',
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h2Bold: {
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h3Bold: {
      fontFamily: 'Roboto',
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h4Bold: {
      fontFamily: 'Roboto',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h5Bold: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h1SemiBold: {
      fontFamily: 'Roboto',
      fontSize: '40px',
      fontWeight: 600,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h2SemiBold: {
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '100%',
      letterSpacing: '0.5%',
    },
    h3SemiBold: {
      fontFamily: 'Roboto',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '100%',
      letterSpacing: '0.25%',
    },
    h4SemiBold: {
      fontFamily: 'Roboto',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '100%',
      letterSpacing: '0',
    },
    h1Medium: {
      fontFamily: 'Roboto',
      fontSize: '48px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0',
    },
    h2Medium: {
      fontFamily: 'Roboto',
      fontSize: '40px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0.5%',
    },
    h3Medium: {
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0.25%',
    },
    h4Medium: {
      fontFamily: 'Roboto',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0',
    },
    titleBold1: {
      fontFamily: 'Roboto',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleBold2: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleBold3: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleBold4: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleBold5: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleSemiBold1: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '1%',
    },
    titleSemiBold2: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '1%',
    },
    titleSemiBold3: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '1%',
    },
    titleSemiBold4: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '5%',
    },
    titleSemiBold5: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '1%',
    },
    titleMedium1: {
      fontFamily: 'Roboto',
      fontSize: '20x',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleMedium2: {
      fontFamily: 'Roboto',
      fontSize: '18x',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleMedium3: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleMedium4: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    titleMedium5: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '100%',
      letterSpacing: '1%',
    },
    bodyRegular1: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    bodyRegular2: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '120%',
      letterSpacing: '0.5%',
    },
    bodyRegular3: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '0.5%',
    },
    bodyRegular4: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '150%',
      letterSpacing: '0.25%',
    },
    bodyRegular5: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '120%',
      letterSpacing: '0.2%',
    },
    bodyMedium1: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    bodyMedium2: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '120%',
      letterSpacing: '0.5%',
    },
    bodyMedium3: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '0.5%',
    },
    bodyMedium4: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '0.25%',
    },
    bodyMedium5: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '120%',
      letterSpacing: '0.2%',
    },
    bodyBold1: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '1%',
    },
    bodyBold2: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0.5%',
    },
    bodyBold3: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 600,

      lineHeight: '150%',
      letterSpacing: '0.5%',
    },
    bodyBold4: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '0.25%',
    },
    bodyBold5: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '120%',
      letterSpacing: '0.2%',
    },
    titleMediumBold: {
      fontFamily: 'Roboto',
      fontSize: '28px',
      fontWeight: 500,
      lineHeight: '19px',
      letterSpacing: '0em',
      textAlign: 'left',
    },
    titleMediumProfileBold: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '19px',
      letterSpacing: '0em',
      textAlign: 'left',
    },
    titleSmallRegular: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '19px',
      letterSpacing: '0em',
      textAlign: 'left',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          fontFamily: 'Roboto',
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '111%',
          letterSpacing: 0.056,
          padding: '10px',
          textTransform: 'inherit',
        },
        contained: {
          border: '1px solid var(--Primary-Brand, #233853)',
          boxShadow: 'none',
          padding: '10px 16px',
          backgroundColor: '#233853',
          color: 'Base.white',
          borderRadius: '6px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          boxShadow: 'none',
          border: '1px solid #233853',
          padding: '10px 16px',
          color: '#233853',
          borderRadius: '6px',
        },
        text: {
          color: '#233853',
          padding: '10px 16px',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'Base.white',
            borderRadius: '4px',
            '&.Mui-focused': {
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '4px !important',
            },
            '& input': {
              color: '#565656',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              letterSpacing: '0.024px',
              padding: '16px',
            },
            '& input::placeholder': {
              color: '#8F8F8F',
              opacity: 1,
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              padding: '0px',
              letterSpacing: '0.024px',
            },
          },
        },
      ],
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          [createTheme().breakpoints.down('sm')]: {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          animationDuration: '1.5s',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // color: '#233853',
          '&.Mui-checked': {
            color: '#233853',
          },
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            fontFamily: 'Roboto',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          size: 'small',
          color: '#233853',
          '&.Mui-checked': {
            color: '#233853',
          },
          '& .MuiFormControlLabel-label': { fontSize: '14px' }
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px',
          fontFamily: 'Roboto',
          lineHeight: '20px',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};

// Define light theme palette
// Update the color palette as per the ux/figma
const lightPalette = {
  Primary: {
    0: '#E5F0FF',
    10: '#D4E6FF',
    20: '#99BCE9',
    30: '#6D90BD',
    40: '#415F86',
    50: '#344F73',
    main: '#233853',
    70: '#1A2B40',
    80: '#0F1A27',
  },
  Neutral: {
    10: '#F8F8F8',
    20: '#F4F4F4',
    30: '#E9E9E9',
    40: '#D2D2D2',
    50: '#BCBCBC',
    60: '#8F8F8F',
    70: '#727272',
    80: '#565656',
    90: '#393939',
    100: '#1D1D1D',
  },
  Informative: {
    1: '#F2F7FF',
    5: '#E0EDFF',
    10: '#BDDAFF',
    20: '#86B8FE',
    30: '#5598F6',
    40: '#2D7AE5',
    50: '#105FCE',
    60: '#004AB1',
    70: '#003B8D',
    80: '#002962',
    90: '#001532',
  },
  Positive: {
    1: '#F4FFF2',
    5: '#E1FCDE',
    10: '#CDF9CA',
    20: '#A4F3A3',
    30: '#7EEB83',
    40: '#42D75B',
    50: '#17BF33',
    60: '#049B22',
    70: '#016A1C',
    80: '#005016',
    90: '#00300F',
  },
  Warning: {
    1: '#FFFBF2',
    5: '#FFF2D2',
    10: '#FFE8B1',
    20: '#FFCF73',
    30: '#FCB33B',
    40: '#F2930D',
    50: '#D66F00',
    60: '#BA5900',
    70: '#943C00',
    80: '#662100',
    90: '#340D00',
  },
  Negative: {
    1: '#FFF2F3',
    5: '#FFD4D8',
    10: '#FFB6BC',
    20: '#FA7D87',
    30: '#F14A58',
    40: '#E42131',
    50: '#CE0718',
    60: '#B1000F',
    70: '#8D000C',
    80: '#620008',
    90: '#320004',
  },
  Base: {
    black: '#000000',
    white: '#FFFFFF',
    link: '#1479FF',
  },

  background: {
    default: '#F4F4F4',
    // paper: '#F4F4F4',
  },
};

// Define dark theme palette
const darkPalette = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
  },
  secondary: {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc',
  },
  background: {
    default: '#340D00',
    paper: '#340D00',
  },
  text: {
    primary: '#ffffff',
    secondary: '#aaaaaa',
  },
};

// Create light and dark themes using common settings and specific palettes
export const lightTheme = createTheme(commonThemeSettings, {
  palette: {
    mode: 'light',
    ...lightPalette,
  },
});

export const darkTheme = createTheme(commonThemeSettings, {
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
});
