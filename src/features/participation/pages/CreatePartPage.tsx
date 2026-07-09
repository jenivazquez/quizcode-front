import { useParams } from 'react-router-dom'
import { Box, TextField, Button, Typography, Paper, Divider, Container, Link, Grid } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import QuizHeader from '../../quiz/components/QuizHeader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import { useCreatePart } from '../hooks/useCreatePart'
import { useDetailRoomToAnswer } from '../../room/hooks/useDetailRoomToAnswer'
import { useDetailQuizToAnswer } from '../../quiz/hooks/useDetailQuizToAnswer'
import { PART_PATHS } from '../routes/participationPaths'
import { Link as RouterLink } from 'react-router-dom'
import { RoomStatus } from '../../room/types/room'
import { STATUS_LABEL } from '../../room/constants/roomConstants'

const CreatePartPage = () => {

  const { roomId } = useParams<{ roomId: string }>()

  const { room, loading: loadingRoom, error: detailRoomError } = useDetailRoomToAnswer()
  const { quiz, loading: loadingQuiz, error: detailQuizError } = useDetailQuizToAnswer(room?.quizId)
  const { form, onSubmit, loading: loadingCreate, error } = useCreatePart()

  const { register, handleSubmit, formState: { errors } } = form

  if (loadingRoom || loadingQuiz) return <PageLoader />
  if (!room) return <ErrorAlert message={detailRoomError} />
  if (!quiz) return <ErrorAlert message={detailQuizError} />

  return (

    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <QuizHeader quiz={quiz} room={room} />

        <Divider />

        <Box sx={{ px: { xs: 5, sm: 10, md: 16 }, py: { xs: 6, sm: 8 } }}>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h6' fontWeight={700} color='primary.main'> ¿Estás preparado? </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 3 }}>
              <ErrorOutlineIcon sx={{ color: 'error.main', fontSize: 18, flexShrink: 0 }} />
              <Typography variant='body2' color='text.secondary'>
                <strong>Recuerda estos datos,</strong> los necesitarás si quieres acceder de nuevo
              </Typography>
            </Box>
          </Box>

          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={3} sx={{ mt: 6 }}>

              {room.status !== RoomStatus.OPENED && 
                <ErrorAlert severity='warning' sx={{mb: 0}}
                  message={`La sala está ${STATUS_LABEL[room.status].toLowerCase()} y no puedes acceder al cuestionario. Si ya participaste, accede con tus datos para ver los resultados.`}
                />
              }

              <ErrorAlert message={error}  sx={{mb: 0}}/>

              <Grid size={12}>
                <TextField 
                  label='Nombre de usuario' 
                  required
                  fullWidth 
                  {...register('username')} 
                  error={!!errors.username} 
                  helperText={errors.username?.message} 
                />
              </Grid>

              <Grid size={6}>
                <TextField 
                  label='Contraseña' 
                  type='password' 
                  required
                  fullWidth 
                  {...register('password')} 
                  error={!!errors.password} 
                  helperText={errors.password?.message} 
                />
              </Grid>

              <Grid size={6}>
                <TextField 
                  label='Confirmar contraseña' 
                  type='password' 
                  required
                  fullWidth 
                  {...register('repeatPassword')} 
                  error={!!errors.repeatPassword} 
                  helperText={errors.repeatPassword?.message} 
                />
              </Grid>

              <Grid size={12}>
                <Button type='submit' variant='contained' size='large' fullWidth disabled={loadingCreate} endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 600, py: 1.5, color: 'text.secondary' }}>
                  Empezar cuestionario
                </Button>
              </Grid>

              <Grid size={12} sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant='body2' color='text.secondary'>
                  ¿Ya participaste?{' '}
                  <Link component={RouterLink} to={PART_PATHS.login(roomId!)}> 
                    Accede con tus datos 
                  </Link>
                </Typography>
              </Grid>

            </Grid>

          </Box>

        </Box>

      </Paper>

    </Container>
  )
}

export default CreatePartPage
