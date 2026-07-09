import { Box, Button, TextField, Typography, Paper, Link, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { userSessionStore } from '../../../shared/session/userSessionStore'
import { PATHS } from '../../../app/routes/paths'

const LoginPage = () => {

  const { form, onSubmit, loading, error } = useLogin()

  const { register, handleSubmit, formState: { errors } } = form
  
  const sessionExpired = userSessionStore.wasExpired()

  return (

    <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', width: '100%' }}>

        <Box sx={{ px: 5, py: 4, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5" fontWeight={700}>Iniciar sesión</Typography>
        </Box>

        <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

          <ErrorAlert severity="warning" message={sessionExpired ? 'Tu sesión ha expirado. Inicia sesión de nuevo.' : null} sx={{ mb: 0 }} />
          
          <ErrorAlert message={error} sx={{ mb: 0 }}/>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>

            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Contraseña"
              type="password"
              required
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>Entrar</Button>

          </Box>

          <Typography variant="body1" align="center" sx={{ mt: 3 }}>
            ¿No tienes cuenta?{' '}
            <Link component={RouterLink} to={PATHS.user.register}>
              Regístrate
            </Link>
          </Typography>

        </Box>

      </Paper>
    </Container>
  )
}

export default LoginPage
