import { Box, Button, TextField, Typography, Paper, Link, Grid, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useCreateUser } from '../hooks/useCreateUser'
import { PATHS } from '../../../app/routes/paths'
import { type CreateUserFormData } from '../schemas/createUserSchema'
import ErrorAlert from '../../../shared/components/ErrorAlert'

const CreateUserPage = () => {
  const { form, onSubmit, loading, error } = useCreateUser()
  const { register, handleSubmit, formState: { errors } } = form

  const fields: { name: keyof CreateUserFormData; label: string; type?: string }[] = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'repeatPassword', label: 'Repetir contraseña', type: 'password' },
    { name: 'name', label: 'Nombre' },
    { name: 'surname1', label: 'Primer apellido' },
    { name: 'surname2', label: 'Segundo apellido' },
  ]

  return (

    <Container maxWidth="md" sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', py: 3}}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', width: '100%' }}>

        <Box sx={{ px: 5, py: 6, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Crear cuenta</Typography>
        </Box>

        <Box sx={{ p: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

          <ErrorAlert message={error} />

          <Box component="form" noValidate sx={{ mt: 4, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={2}>

              {fields.map(({ name, label, type }) => (
                <Grid size={12} key={name}>
                  <TextField
                    label={label}
                    type={type || 'text'}
                    required
                    fullWidth
                    {...register(name)}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string | undefined}
                  />
                </Grid>
              ))}

              <Grid size={12}>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>Registrarse</Button>
              </Grid>

            </Grid>

          </Box>

          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            ¿Ya tienes cuenta?{' '}
            <Link component={RouterLink} to={PATHS.auth.login}>
              Inicia sesión
            </Link>
          </Typography>

        </Box>

      </Paper>
    </Container>
  )
}

export default CreateUserPage
