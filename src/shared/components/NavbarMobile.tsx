import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Avatar, Typography, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { PATHS } from '../../app/routes/paths'
import { useAuth } from '../hooks/useAuth'
import { useLogoutUser } from '../hooks/useLogoutUser'
import { useLogoutPart } from '../hooks/useLogoutPart'
import { useDetailUser } from '../../features/user/hooks/useDetailUser'

const NavbarMobile = () => {

  const { isAuthUser, isAuthPart } = useAuth()
  const { logout } = useLogoutUser()
  const { logout: logoutPart } = useLogoutPart()
  const { user } = useDetailUser()

  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (

    <>
      <IconButton color="inherit" sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={close}>

        <List sx={{ width: 250, pt: 2 }} disablePadding>

          {isAuthUser ? (
            <>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pb: 2, pt: 1 }}>
                <Avatar sx={{ width: 36, height: 36, fontSize: 16, boxShadow: (t) => `0 0 0 2px ${t.palette.primary.extralight}, 0 0 0 4px ${t.palette.primary.light}` }}>
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

              <Divider sx={{ my: 1, mx: 2 }} />

              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={PATHS.user.profile} onClick={close}>
                  <ListItemIcon><ManageAccountsIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Mi perfil" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={PATHS.quiz.list} onClick={close}>
                  <ListItemIcon><FormatListBulletedIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Mis cuestionarios" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={PATHS.room.list} onClick={close}>
                  <ListItemIcon><ListAltIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Mis salas" />
                </ListItemButton>
              </ListItem>

              <Divider sx={{ my: 1, mx: 2 }} />

              <ListItem disablePadding>
                <ListItemButton onClick={() => { logout(); close() }}>
                  <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Cerrar sesión" />
                </ListItemButton>
              </ListItem>

            </>
          ) : isAuthPart ? (

            <ListItem disablePadding>
              <ListItemButton onClick={() => { logoutPart(); close() }}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>

          ) : (
            <>

              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={PATHS.room.join} onClick={close}>
                  <ListItemIcon><MeetingRoomIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Unirse a sala" />
                </ListItemButton>
              </ListItem>

              <Divider sx={{ my: 1, mx: 2 }} />

              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={PATHS.auth.login} onClick={close}>
                  <ListItemIcon><LoginIcon fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Acceder" />
                </ListItemButton>
              </ListItem>

            </>
          )}

        </List>

      </Drawer>
    </>
  )
}

export default NavbarMobile
