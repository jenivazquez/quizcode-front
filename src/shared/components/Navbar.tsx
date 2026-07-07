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

        <Link component={RouterLink} to={PATHS.home.root} underline="none" sx={{ mr: 'auto', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="QuizCode" style={{ height: 40 }} />
        </Link>

        {isMobile ? <NavbarMobile /> : <NavbarDesktop />}

      </Toolbar>
    </AppBar>
  )
}

export default Navbar
