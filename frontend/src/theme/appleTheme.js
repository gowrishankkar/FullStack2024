import { createTheme } from '@mui/material/styles';

const appleTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#f5f5f7',
      dark: '#1d1d1f',
    },
    secondary: {
      main: '#0071e3',
      light: '#0077ed',
      dark: '#005cc8',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#86868b',
      disabled: '#d2d2d7',
    },
    divider: '#e5e5e7',
    success: {
      main: '#34c759',
    },
    error: {
      main: '#ff3b30',
    },
    warning: {
      main: '#ff9500',
    },
    info: {
      main: '#0071e3',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.1,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.008em',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.007em',
      lineHeight: 1.25,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
    body2: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.005em',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.005em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      color: '#86868b',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          backgroundImage: 'none',
          boxShadow: '0 1px 0 0 rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e5e5e7',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 52,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '980px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1d1d1f',
          },
        },
        containedSecondary: {
          backgroundColor: '#0071e3',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0077ed',
          },
        },
        outlined: {
          borderColor: '#e5e5e7',
          color: '#1d1d1f',
          '&:hover': {
            backgroundColor: '#f5f5f7',
            borderColor: '#d2d2d7',
          },
        },
        outlinedPrimary: {
          borderColor: '#1d1d1f',
          color: '#1d1d1f',
          '&:hover': {
            backgroundColor: '#f5f5f7',
          },
        },
        text: {
          color: '#0071e3',
          '&:hover': {
            backgroundColor: 'rgba(0, 113, 227, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#f5f5f7',
            border: '1px solid #e5e5e7',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: '#d2d2d7',
              backgroundColor: '#ffffff',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              borderColor: '#0071e3',
              boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
              '& fieldset': {
                borderColor: '#0071e3',
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            fontSize: '1rem',
            '&::placeholder': {
              color: '#86868b',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '18px',
          border: '1px solid #e5e5e7',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
            borderColor: '#d2d2d7',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '18px',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 500,
          fontSize: '0.9rem',
          height: 32,
        },
        filled: {
          backgroundColor: '#f5f5f7',
          color: '#1d1d1f',
          '&:hover': {
            backgroundColor: '#e8e8ed',
          },
        },
        outlined: {
          borderColor: '#e5e5e7',
          color: '#1d1d1f',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e5e5e7',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontSize: '0.9rem',
          border: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e5e7',
          marginTop: '8px',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#ff3b30',
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default appleTheme;
