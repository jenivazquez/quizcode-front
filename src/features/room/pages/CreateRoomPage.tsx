import {
  Box, Button, TextField, Typography, Paper, Container, Grid,
  FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip, Alert,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateRoom } from '../hooks/useCreateRoom'
import { useListQuiz } from '../../quiz/hooks/useListQuiz'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { QuizStatus } from '../../quiz/types/quiz'
import { STATUS_LABEL, sxStatusChip } from '../../quiz/constants/quizConstants'

const CreateRoomPage = () => {

  const { quizId: preselectedQuizId } = useParams<{ quizId: string }>()

  const { form, onSubmit, loading, error } = useCreateRoom()
  const { quizzes, loading: loadingQuizzes } = useListQuiz()
  const { control, register, handleSubmit, formState: { errors } } = form

  const navigate = useNavigate()

  const visibleQuizzes = preselectedQuizId ? quizzes.filter(quiz => quiz.id === preselectedQuizId) : quizzes
  const hasQuizzesPublished = preselectedQuizId ? true : quizzes.some(q => q.status !== QuizStatus.CREATED)

  return (

    <Container maxWidth="md" sx={{ py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Nueva sala</Typography>
        </Box>

        <Box sx={{ p: 7 }}>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={3}>

              <ErrorAlert message={error} />

              {!loadingQuizzes && !hasQuizzesPublished && (
                <Grid size={12}>
                  <Alert severity="warning">
                    No tienes cuestionarios publicados. Debes publicar un cuestionario antes de crear una sala.
                  </Alert>
                </Grid>
              )}

              <Grid size={12}>
                <Controller
                  name="quizId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth required error={!!errors.quizId}>
                      <InputLabel>Cuestionario</InputLabel>
                      <Select {...field} label="Cuestionario" disabled={loadingQuizzes || !!preselectedQuizId}>
                        {visibleQuizzes.map(quiz => (
                          <MenuItem key={quiz.id} value={quiz.id} disabled={quiz.status === QuizStatus.CREATED}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 2 }}>
                              <Typography variant="body2">{quiz.title}</Typography>
                              <Chip label={STATUS_LABEL[quiz.status]} variant="outlined" size="small" sx={sxStatusChip[quiz.status]}/>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.quizId && <FormHelperText>{errors.quizId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Nombre"
                  required
                  fullWidth
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Descripción"
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>Cancelar</Button>
                <Button type="submit" variant="contained" disabled={loading || !hasQuizzesPublished}>Crear sala</Button>
              </Grid>

            </Grid>

          </Box>

        </Box>

      </Paper>

    </Container>
  )
}

export default CreateRoomPage
