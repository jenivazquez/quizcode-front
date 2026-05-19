import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteColor {
    extralight?: string
  }
  interface SimplePaletteColorOptions {
    extralight?: string
  }
}

const theme = createTheme({
  palette: {
    primary: {
      extralight: '#ded3e6',
      light: '#cfc0da',
      main: '#9f78bc',
      dark: '#835ea0',
    },
    secondary: { main: '#E3E9E4' },
    success: { main: '#bae0bd' },
    error: { main: '#c96b6b' }, //c96b6b
    background: {
      default: '#fdfdff', // #fbfbfb
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.extralight,
          color: theme.palette.getContrastText(theme.palette.primary.extralight!),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.extralight,
          color: theme.palette.getContrastText(theme.palette.primary.extralight!),
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiPaper: {
      defaultProps: { variant: 'outlined', elevation: 0 },
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        },
      },
    },
  },
})

export default theme