import { AppBar, Toolbar, Tooltip, Link, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../../app/routes/paths'

const Navbar = () => {
  const { isAuth, clearSession } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>

        <Link component={RouterLink} to={PATHS.home} color="inherit" variant="h5" underline="none" sx={{ mr: 'auto', '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
          QuizCode
        </Link>

        {isAuth ? (
          <>
            <Button component={RouterLink} to={PATHS.list} color="inherit" startIcon={<FormatListBulletedIcon />} sx={{ mx: 1, '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
              Mis cuestionarios
            </Button>
            <Tooltip title="Mi perfil">
              <Link component={RouterLink} to={PATHS.profile} color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', mx: 3, '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
                <AccountCircleIcon fontSize="large" />
              </Link>
            </Tooltip>
            <Tooltip title="Cerrar sesión">
              <Link component="button" onClick={clearSession} color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center', mx: 3, '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
                <LogoutIcon fontSize="large" />
              </Link>
            </Tooltip>
          </>
        ) : (
          <>
            <Link component={RouterLink} to={PATHS.login} color="inherit" variant="body1" underline="none" sx={{ mx: 3, '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
              Iniciar sesión
            </Link>
            <Link component={RouterLink} to={PATHS.register} color="inherit" variant="body1" underline="none" sx={{ mx: 3, '&:hover': { opacity: 0.75 }, transition: 'opacity 0.2s' }}>
              Registrarse
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
