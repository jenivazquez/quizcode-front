import { useParams } from 'react-router-dom'
import { Box, TextField, Button, Typography, Paper, Divider, Container, Link } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import QuizHeader from '../../quiz/components/QuizHeader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import { useLoginPart } from '../hooks/useLoginPart'
import { useDetailRoomToAnswer } from '../../room/hooks/useDetailRoomToAnswer'
import { PART_PATHS } from '../routes/participationPaths'
import { Link as RouterLink } from 'react-router-dom'

const LoginPartPage = () => {

  const { roomId } = useParams<{ roomId: string }>()

  const { room, loading: loadingRoom } = useDetailRoomToAnswer()
  const { form, onSubmit, loading, error } = useLoginPart()

  const { register, handleSubmit, formState: { errors } } = form

  if (loadingRoom) return <PageLoader />
  if (!room) return null

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <QuizHeader quizId={room.quizId} />

        <Divider />

        <Box sx={{ px: { xs: 5, sm: 10, md: 16 }, py: { xs: 6, sm: 8 }, display: 'flex', flexDirection: 'column' }}>

          <Box sx={{ textAlign: 'center'}}>
            <Typography variant='h6' fontWeight={700} color='primary.main'> Bienvenido de nuevo </Typography>
            <Box sx={{  mt: 2 }}>
              <Typography variant='body2' color='text.secondary'>
                Accede a tu <strong>cuenta</strong> con tus credenciales
              </Typography>
            </Box>
          </Box>

          <ErrorAlert message={error} />

          <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5 }}>

            <TextField 
              label='Nombre de usuario' 
              autoComplete='off' 
              required 
              fullWidth 
              {...register('username')} 
              error={!!errors.username} 
              helperText={errors.username?.message} 
            />

            <TextField 
              label='Contraseña' 
              type='password' 
              required 
              fullWidth 
              {...register('password')} 
              error={!!errors.password} 
              helperText={errors.password?.message} 
            />

            <Button type='submit' variant='contained' size='large' disabled={loading} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 2, fontWeight: 600, py: 1.5, color: 'text.secondary' }}>
              Acceder
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant='body2' color='text.secondary'>
                ¿Eres nuevo?{' '}
                <Link component={RouterLink} to={PART_PATHS.create(roomId!)}> 
                  Regístrate aquí 
                </Link>
              </Typography>
            </Box>

          </Box>

        </Box>

      </Paper>

    </Container>
  )
}

export default LoginPartPage
