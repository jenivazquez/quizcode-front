import { Box, TextField, Button, Typography, Paper } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useJoinRoom } from '../hooks/useJoinRoom'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { partSessionStore } from '../../../shared/session/partSessionStore'

const JoinRoomPage = () => {

  const { form, onSubmit, loading, error } = useJoinRoom()
  const { register, handleSubmit, formState: { errors } } = form

  const partExpired = partSessionStore.wasExpired()
  const partDeleted = partSessionStore.wasDeleted()

  const sessionMessage =
    partExpired ? 'Tu sesión ha expirado. Vuelve a unirte a la sala.'
      : partDeleted ? 'La sala o tu participación han sido eliminadas. Únete de nuevo o ponte en contacto con el organizador.'
        : null

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 }, background: 'linear-gradient(to bottom, #faf5f3 0%, #faf5f3 26%, #f3faf8 46%, #f3faf8 58%, #f7f5fd 78%, #f7f5fd 100%)' }}>

      <Paper sx={{ borderRadius: 4, width: '100%', maxWidth: 800, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

        <Box sx={{ bgcolor: 'primary.extralight', opacity: 0.90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, p: { xs: 4, md: 6 }, flex: { xs: 'none', md: '0 0 260px' }, minHeight: { xs: 160, md: 'unset' }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

          <Box sx={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.35, top: -80, left: -60 }} />
          <Box sx={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.35, bottom: -100, right: -60 }} />

          <img src='/logo.png' alt='QuizCode' style={{ height: 65, position: 'relative', zIndex: 1 }} />

          <Typography variant='body1' color='text.secondary' sx={{ position: 'relative', zIndex: 1, lineHeight: 2, maxWidth: { xs: 'none', md: 140 } }}>
            <b>Accede</b> a la sala que te ha proporcionado el <b>organizador</b> del cuestionario
          </Typography>

        </Box>

        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ flex: 1, px: { xs: 4, sm: 6 }, py: { xs: 8, sm: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>

          <Typography variant='h4' fontWeight={600} color='primary.main' textAlign='center' letterSpacing='0.05em' sx={{ mb: 3, opacity: 0.80 }}>
            ¡Únete a la sala!
          </Typography>

          <ErrorAlert severity="warning" message={sessionMessage} sx={{ mb: 0 }} />

          <ErrorAlert message={error} sx={{ mb: 0 }} />

          <TextField
            placeholder='CÓDIGO DE LA SALA'
            autoComplete='off'
            fullWidth
            disabled={loading}
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message}
            slotProps={{
              htmlInput: {
                maxLength: 8,
                style: { textAlign: 'center', fontSize: '2.4rem', fontWeight: 600, letterSpacing: '0.5em', padding: '20px 16px' },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 3,
                '& input': { color: 'text.secondary' },
                '& fieldset': { borderWidth: 1.5 },
                '&:not(.Mui-focused):hover fieldset': { borderColor: 'rgba(0,0,0,0.35)' },
                '&.Mui-focused fieldset': { borderWidth: 1.5 },
              },
              '& input::placeholder': { fontSize: '1.3rem', letterSpacing: '0.15em', fontWeight: 700, transform: 'translateY(-6px)' },
            }}
          />

          <Button type='submit' variant='contained' size='large' disabled={loading} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 2, fontWeight: 600, py: 1.5, color: 'text.secondary' }}>
            Entrar a la sala
          </Button>

        </Box>
      </Paper>
    </Box>
  )
}

export default JoinRoomPage
