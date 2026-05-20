import { AppBar, Toolbar, Link, useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { PATHS } from '../../app/routes/paths'
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

const Navbar = () => {
  
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <AppBar position="static">
      <Toolbar>

        <Link component={RouterLink} to={PATHS.home.root} color="inherit" variant="h5" underline="none" sx={{ mr: 'auto', '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
          QuizCode
        </Link>

        {isMobile ? <NavbarMobile /> : <NavbarDesktop />}

      </Toolbar>
    </AppBar>
  )
}

export default Navbar
