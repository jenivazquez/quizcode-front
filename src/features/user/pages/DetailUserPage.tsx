import { Avatar, Box, Paper, Typography, IconButton, Tooltip, Grid, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDetailUser } from '../hooks/useDetailUser'
import { useDeactivateUser } from '../hooks/useDeactivateUser'
import { PATHS } from '../../../app/routes/paths'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import PageLoader from '../../../shared/components/PageLoader'
import SectionTitle from '../../../shared/components/SectionTitle'
import InfoField from '../../../shared/components/InfoField'

const DetailUserPage = () => {

  const { user, loading, error } = useDetailUser()
  const { deactivate, loading: loadingDeactivate, error: deactivateError } = useDeactivateUser()
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)

  if (loading) return <PageLoader />
  if (!user) return <ErrorAlert message={error} />

  return (
    <>

      <Container maxWidth="lg" sx={{ pt: 3 }}>

        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

          <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 100, height: 100, fontSize: 45, boxShadow: (t) => `0 0 0 5px ${t.palette.primary.extralight}, 0 0 0 8px ${t.palette.primary.medium}` }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" fontWeight={700}>
              {user.name} {user.surname1} {user.surname2}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Tooltip title="Editar perfil">
              <IconButton color="primary" onClick={() => navigate(PATHS.user.edit)} sx={{ border: '1px solid', borderColor: 'primary.light', bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Desactivar cuenta">
              <IconButton color="error" onClick={() => setOpenDialog(true)} sx={{ border: '1px solid', borderColor: 'error.light', bgcolor: 'background.paper', '&:hover': { bgcolor: 'grey.100' } }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <ErrorAlert message={deactivateError} />

        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Paper sx={{ p: 5, borderRadius: 3 }}>

          <SectionTitle icon={<PersonIcon/>} title="Información personal" />

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <InfoField label="Nombre" value={user.name} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <InfoField label="Primer apellido" value={user.surname1} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <InfoField label="Segundo apellido" value={user.surname2} />
            </Grid>
          </Grid>

        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper sx={{ p: 5, borderRadius: 3 }}>

          <SectionTitle icon={<AlternateEmailIcon/>} title="Cuenta" />

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoField label="Email" value={user.email} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoField label="Contraseña" value="•••••••••••••" />
            </Grid>
          </Grid>

        </Paper>
      </Container>

      <ConfirmDialog
        open={openDialog}
        title="¿Quieres desactivar tu cuenta?"
        message="Tu sesión se cerrará y perderás el acceso hasta que un administrador reactive tu cuenta."
        loading={loadingDeactivate}
        onConfirm={ async() => {await deactivate(); setOpenDialog(false)} }
        onClose={() => setOpenDialog(false)}
      />
      
    </>
  )
}

export default DetailUserPage
