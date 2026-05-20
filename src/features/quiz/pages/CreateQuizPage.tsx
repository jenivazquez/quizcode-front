import {
  Box, Button, TextField, Typography, Paper, Container,
  Switch, FormControlLabel, Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCreateQuiz } from '../hooks/useCreateQuiz'
import { PATHS } from '../../../app/routes/paths'
import ErrorAlert from '../../../shared/components/ErrorAlert'

const CreateQuizPage = () => {
  const { form, onSubmit, loading, error, hasLimit } = useCreateQuiz()
  const { register, handleSubmit, formState: { errors } } = form
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Nuevo cuestionario</Typography>
        </Box>

        <Box sx={{ p: 7}}>

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
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={<Switch {...register('hasLimit')} />}
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
                <Button variant="outlined" onClick={() => navigate(PATHS.quiz.list)} disabled={loading}>Cancelar</Button>
                <Button type="submit" variant="contained" disabled={loading}>Crear cuestionario</Button>
              </Grid>

            </Grid>
          </Box>

        </Box>

      </Paper>
    </Container>
  )
}

export default CreateQuizPage
