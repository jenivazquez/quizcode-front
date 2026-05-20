import {
  Box, Button, TextField, Paper, Typography,
  Switch, FormControlLabel, Grid, Container,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUpdateQuiz } from '../hooks/useUpdateQuiz'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'

const UpdateQuizPage = () => {

  const { form, onSubmit, quiz, loadingQuiz, loadingUpdate, error } = useUpdateQuiz()
  const { register, handleSubmit, watch, formState: { errors, isDirty } } = form
  const navigate = useNavigate()
  const hasLimit = watch('hasLimit')

  if (loadingQuiz) return <PageLoader />
  if (!quiz) return <ErrorAlert message={error} />

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Modificar cuestionario</Typography>
        </Box>

        <Box sx={{ p: 7 }}>
          
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            
            <Grid container spacing={3}>

              <ErrorAlert message={error} />

              <Grid size={12}>
                <TextField
                  label="Título"
                  required
                  fullWidth
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  minRows={2}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={<Switch {...register('hasLimit')} defaultChecked={quiz.hasLimit} />}
                  label="Limitar tiempo de respuesta"
                />
              </Grid>

              {hasLimit && (
                <Grid size={12}>
                  <TextField
                    label="Tiempo límite (minutos)"
                    type="number"
                    required
                    fullWidth
                    slotProps={{ htmlInput: { min: 1 } }}
                    {...register('limitMinutes', { valueAsNumber: true })}
                    error={!!errors.limitMinutes}
                    helperText={errors.limitMinutes?.message}
                  />
                </Grid>
              )}

              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={loadingUpdate}>Cancelar</Button>
                <Button type="submit" variant="contained" disabled={loadingUpdate || !isDirty}>Guardar cambios</Button>
              </Grid>

            </Grid>
          </Box>
        </Box>

      </Paper>
    </Container>
  )
}

export default UpdateQuizPage
