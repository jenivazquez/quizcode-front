import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { Link as RouterLink } from 'react-router-dom'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { PATHS } from '../../../app/routes/paths'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import SectionTitle from '../../../shared/components/SectionTitle'
import PageLoader from '../../../shared/components/PageLoader'

const UpdateUserPage = () => {

  const { form, onSubmit, user, loadingUser, loadingEdit, error } = useUpdateUser()
  const { register, handleSubmit, formState: { errors, isDirty } } = form

  if (loadingUser) return <PageLoader />
  if (!user) return <ErrorAlert message={error} />

  return (

    <Container maxWidth="lg" sx={{ pt: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar sx={(theme) => ({ width: 100, height: 100, bgcolor: alpha(theme.palette.primary.main, 0.55), outline: '3px solid', outlineColor: alpha(theme.palette.primary.main, 0.55), outlineOffset: '4px' })}>
            <EditIcon sx={{ fontSize: 45 }} />
          </Avatar>
          <Typography variant="h5" fontWeight={700}>Editar perfil</Typography>
        </Box>

        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="h6">{user.name} {user.surname1} {user.surname2}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{user.email}</Typography>
        </Box>

      </Paper>

      <Paper sx={{ mt: 3, p: 5, borderRadius: 3 }}>

        <ErrorAlert message={error} />

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

          <SectionTitle icon={<PersonIcon />} title="Información personal" />

          <Grid container spacing={5}>
            
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Nombre"
                required
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Primer apellido"
                required
                fullWidth
                {...register('surname1')}
                error={!!errors.surname1}
                helperText={errors.surname1?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Segundo apellido"
                required
                fullWidth
                {...register('surname2')}
                error={!!errors.surname2}
                helperText={errors.surname2?.message}
              />
            </Grid>

          </Grid>

          <Box sx={{ mt: 5 }}>
            <SectionTitle icon={<LockIcon />} title="Contraseña" />
          </Box>

          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Nueva contraseña"
                type="password"
                fullWidth
                placeholder="••••••••"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Repetir contraseña"
                type="password"
                fullWidth
                placeholder="••••••••"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('repeatPassword')}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button component={RouterLink} to={PATHS.user.profile} variant="outlined" size="large" disabled={loadingEdit}>Cancelar</Button>
            <Button type="submit" variant="contained" size="large" disabled={loadingEdit || !isDirty}>Guardar cambios</Button>
          </Box>

        </Box>

      </Paper>

    </Container>
  )
}

export default UpdateUserPage
