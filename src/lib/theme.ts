import { createTheme } from '@mui/material/styles';

// Creating a theme that uses fixed color values matching our CSS variables
export const theme = createTheme({
  palette: {
    primary: {
      light: '#54a8ff',
      main: '#2c87f0',
      dark: '#1866d0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b39f71',
      main: '#a28958',
      dark: '#8c714a',
      contrastText: '#fff',
    },
    success: {
      main: '#16a34a',
    },
    warning: {
      main: '#eab308',
    },
    error: {
      main: '#dc2626',
    },
    info: {
      main: '#0284c7',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#171717',
      secondary: '#737373',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#2c87f0',
          '&:hover': {
            backgroundColor: '#1866d0',
          },
        },
        containedSecondary: {
          backgroundColor: '#a28958',
          '&:hover': {
            backgroundColor: '#8c714a',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&.Mui-focused fieldset': {
              borderColor: '#2c87f0',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#171717',
          borderRadius: 8,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#171717',
        },
      },
    },
  },
});

// Theme for high contrast accessibility mode
export const highContrastTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      light: '#5c9eff',
      main: '#003d99',
      dark: '#003080',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#404040',
    },
  },
  typography: {
    ...theme.typography,
    fontSize: 16 * 1.1, // 10% larger
  },
});

export default theme; 