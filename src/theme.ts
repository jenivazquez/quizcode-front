import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteColor {
    extralight?: string
    medium?: string
  }
  interface SimplePaletteColorOptions {
    extralight?: string
    medium?: string
  }
}

const theme = createTheme({
  palette: {
    primary: {
      extralight: '#e3d8ec',
      light: '#d1c2dc',
      medium: '#b199c0',
      main: '#9f78bc',
      dark: '#835ea0',
    },
    secondary: { main: '#E3E9E4' },
    success: { main: '#bae0bd' },
    error: { main: '#c96b6b' }, //c96b6b
    background: {
      default: '#faf5f32a', // #fdfdff
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
          '& a, & .MuiLink-root, & .MuiButton-root': { transition: 'transform 0.2s' },
          '& a:hover, & .MuiLink-root:hover, & .MuiButton-root:hover': { transform: 'scale(1.10)' },
          '& .MuiButton-root:hover': { backgroundColor: 'transparent' },
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
          background: theme.palette.primary.light,
          color: theme.palette.primary.dark,
          outline: 'none',
          fontWeight: 700
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