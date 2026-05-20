import { createTheme, alpha } from '@mui/material/styles'

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
      extralight: '#e3d8ec',
      light: '#d5c6df',
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
          color: theme.palette.action.active,
          border: 'none',
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
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.55),
          outlineWidth: '3px',
          outlineStyle: 'solid',
          outlineColor: alpha(theme.palette.primary.main, 0.55),
          outlineOffset: '4px',
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.extralight,
          color: theme.palette.getContrastText(theme.palette.primary.extralight!),
        }),
      },
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#efe9f4',
          color: '#333333',
          '.MuiTooltip-popper[data-popper-placement*="top"] &': { marginBottom: '1px' },
          '.MuiTooltip-popper[data-popper-placement*="bottom"] &': { marginTop: '1px' },
          '.MuiTooltip-popper[data-popper-placement*="left"] &': { marginRight: '1px' },
          '.MuiTooltip-popper[data-popper-placement*="right"] &': { marginLeft: '1px' },
        },
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