import { createTheme } from '@mui/material/styles';

export const lightPaletteText = {
  primary: 'rgb(17, 24, 39)',
  secondary: 'rgb(107, 114, 128)',
  disabled: 'rgb(149, 156, 169)',
};

export const darkPaletteText = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(148, 163, 184)',
  disabled: 'rgb(156, 163, 175)',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    divider: '#e2e8f0',
    text: lightPaletteText,
    common: {
      black: 'rgb(17, 24, 39)',
      white: 'rgb(255, 255, 255)',
    },
    primary: {
      light: '#64748b',
      main: '#ccf49f',
      dark: '#66b394',
      contrastText: darkPaletteText.primary,
    },
    secondary: {
      light: '#333333',
      main: '#242424',
      dark: '#171717',
      contrastText: darkPaletteText.primary,
    },
    background: {
      paper: '#ffffff',
      default: '#fdfdfd',
    },
    error: {
      light: '#ffcdd2',
      main: '#f44336',
      dark: '#b71c1c',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontWeight: 300,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'text',
        color: 'inherit',
        margin: 'inherit',
      },
      styleOverrides: {
        root: {
          margin: 'inherit',
        },
      },
    },
  },
});

export default theme;
