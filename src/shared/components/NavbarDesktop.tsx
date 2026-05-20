import { Box, Tooltip, Link, Menu, MenuItem, Divider, ListItemIcon, Avatar, Typography, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { PATHS } from '../../app/routes/paths'
import { useAuth } from '../hooks/useAuth'
import { useLogout } from '../hooks/useLogout'
import { useDetailUser } from '../../features/user/hooks/useDetailUser'

const NavbarDesktop = () => {

  const { isAuth } = useAuth()
  const { logout } = useLogout()
  const { user } = useDetailUser()
  
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const close = () => setAnchor(null)

  return (

    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>

      {isAuth ? (
        <>
          <Tooltip title="Menú">
            <Link component="button" onClick={(e) => setAnchor(e.currentTarget)} underline="none" sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
              <Avatar sx={{ width: 38, height: 38, fontSize: 20, outlineWidth: '2px', outlineOffset: '2px' }}>
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </Tooltip>

          <Menu anchorEl={anchor} open={!!anchor} onClose={close}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pb: 2, pt: 1  }}>
              <Avatar sx={{ width: 36, height: 36, fontSize: 20, outlineWidth: '2px', outlineOffset: '2px' }}>
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {user?.name} {user?.surname1} {user?.surname2}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx= {{mb: 1}}/>
            
            <MenuItem component={RouterLink} to={PATHS.user.profile} onClick={close}>
              <ListItemIcon><ManageAccountsIcon fontSize="small" /></ListItemIcon>
              Mi perfil
            </MenuItem>

            <MenuItem component={RouterLink} to={PATHS.quiz.list} onClick={close}>
              <ListItemIcon><FormatListBulletedIcon fontSize="small" /></ListItemIcon>
              Mis cuestionarios
            </MenuItem>
            
            <MenuItem component={RouterLink} to={PATHS.quiz.list} onClick={close}>
              <ListItemIcon><FormatListBulletedIcon fontSize="small" /></ListItemIcon>
              Mis salas
            </MenuItem>

            <Divider/>
            
            <MenuItem onClick={() => { logout(); close() }}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Cerrar sesión
            </MenuItem>

          </Menu>

        </>

      ) : (

        <Button component={RouterLink} to={PATHS.auth.login} color="inherit" startIcon={<LoginIcon fontSize="large" />} sx={{ mx: 1, fontWeight: 700, textTransform: 'none', fontSize: '1rem' }}>
          Acceder
        </Button>

      )}

    </Box>
  )
}

export default NavbarDesktop
