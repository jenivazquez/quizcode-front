import {
  Box, Button, TextField, Typography, Paper, Container, Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUpdateRoom } from '../hooks/useUpdateRoom'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'

const UpdateRoomPage = () => {

  const { form, onSubmit, room, loadingRoom, loadingUpdate, error } = useUpdateRoom()
  const { register, handleSubmit, formState: { errors, isDirty } } = form
  const navigate = useNavigate()

  if (loadingRoom) return <PageLoader />
  if (!room) return <ErrorAlert message={error} />

  return (

    <Container maxWidth="md" sx={{ py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Modificar sala</Typography>
        </Box>

        <Box sx={{ p: 7 }}>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={3}>

              <ErrorAlert message={error} />

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

export default UpdateRoomPage
