import {
  Box, Typography, Paper, Container, Chip, IconButton, Tooltip, Button, Link,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDetailRoom } from '../hooks/useDetailRoom'
import { useStateRoom } from '../hooks/useStateRoom'
import { useReviewRoom } from '../hooks/useReviewRoom'
import { useDeleteRoom } from '../hooks/useDeleteRoom'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { PATHS } from '../../../app/routes/paths'
import { STATUS_LABEL, sxStatusChip } from '../constants/roomConstants'
import { RoomStatus } from '../types/room'
import ListParticipationsSection from '../../participation/sections/ListPartSection'

const DetailRoomPage = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  
  const { room, loading, error, refreshRoom } = useDetailRoom()
  const { open, pause, reopen, close, loading: loadingState, error: stateError } = useStateRoom()
  const { markAsReview, loading: loadingReview, error: reviewError } = useReviewRoom()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteRoom()
  const navigate = useNavigate()

  const [openDialogOpen,   setOpenDialogOpen]   = useState(false)
  const [openDialogClose,  setOpenDialogClose]  = useState(false)
  const [openDialogReview, setOpenDialogReview] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  if (loading) return <PageLoader />
  if (!room || !quizId || !roomId) return <ErrorAlert message={error} />

  const isCreated = room.status === RoomStatus.CREATED
  const isOpened  = room.status === RoomStatus.OPENED
  const isPaused  = room.status === RoomStatus.PAUSED
  const isClosed  = room.status === RoomStatus.CLOSED

  const dateOpts: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  const createdAt  = new Date(room.createdAt).toLocaleString('es-ES', dateOpts)
  const startedAt  = room.startedAt  ? new Date(room.startedAt).toLocaleString('es-ES',  dateOpts) : null
  const finishedAt = room.finishedAt ? new Date(room.finishedAt).toLocaleString('es-ES', dateOpts) : null

  return (

    <Container maxWidth="lg" sx={{ py: 3 }}>

      <ErrorAlert message={error} />
      <ErrorAlert message={stateError} />
      <ErrorAlert message={reviewError} />
      <ErrorAlert message={deleteError} />

      <Paper sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }}>

        <Box sx={{ display: 'flex', alignItems: 'stretch', bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            {isCreated && (
              <Button disabled={loadingState} onClick={() => setOpenDialogOpen(true)} startIcon={<PlayArrowIcon />} sx={{ borderRadius: 0, color: 'success.dark', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                Abrir
              </Button>
            )}
            {isOpened && (
              <Button disabled={loadingState} onClick={async () => { await pause(); refreshRoom() }} startIcon={<PauseIcon />} sx={{ borderRadius: 0, color: 'primary.main', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                Pausar
              </Button>
            )}
            {isPaused && (
              <>
                <Button disabled={loadingState} onClick={async () => { await reopen(); refreshRoom() }} startIcon={<PlayArrowIcon />} sx={{ borderRadius: 0, color: 'success.dark', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                  Reabrir
                </Button>
                <Button disabled={loadingState} onClick={() => setOpenDialogClose(true)} startIcon={<StopIcon />} sx={{ borderRadius: 0, color: 'error.main', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                  Cerrar
                </Button>
              </>
            )}
            {isClosed && !room.reviewed && (
              <Button disabled={loadingReview} onClick={() => setOpenDialogReview(true)} startIcon={<TaskAltIcon />} sx={{ borderRadius: 0, color: 'primary.dark', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                Marcar como revisada
              </Button>
            )}
            {isClosed && room.reviewed && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, color: 'success.dark' }}>
                <TaskAltIcon fontSize="small" />
                <Typography variant="body1" fontWeight={500} color="success.dark">Sala revisada</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, py: 1.5, px: 2 }}>
            <Typography variant="body1" >Estado:</Typography>
            <Chip label={STATUS_LABEL[room.status]} variant="outlined" sx={sxStatusChip[room.status]} />
          </Box>

          <Box sx={{ flex: { sm: 1 }, display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end' }}>
            {!isClosed && (
              <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                <Tooltip title="Modificar sala">
                  <IconButton onClick={() => navigate(PATHS.room.edit(quizId, roomId))} sx={{ borderRadius: 0, color: 'primary.main', px: 2 }}>
                    <EditIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            {!isOpened && (
              <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                <Tooltip title="Eliminar sala">
                  <IconButton color="error" onClick={() => setOpenDialogDelete(true)} sx={{ borderRadius: 0, px: 2 }}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 5, py: 4, textAlign: 'center', gap: 3, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <Typography variant="h5">{room.name}</Typography>

          <Typography variant="body1" color="text.secondary">{room.description}</Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Estado:</Typography>
            <Chip label={STATUS_LABEL[room.status]} variant="outlined" sx={sxStatusChip[room.status]} />
          </Box>

          {room.code && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>Código de acceso:</Typography>
              <Chip label={room.code} sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 4, px: 1 }} />
            </Box>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>Creada:</Typography>
              <Chip icon={<CalendarTodayIcon />} label={createdAt} size="small" variant="outlined" />
            </Box>
            {startedAt && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>Iniciada:</Typography>
                <Chip icon={<AccessTimeIcon />} label={startedAt} size="small" variant="outlined" />
              </Box>
            )}
            {finishedAt && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>Finalizada:</Typography>
                <Chip icon={<AccessTimeIcon />} label={finishedAt} size="small" variant="outlined" />
              </Box>
            )}
          </Box>

          {room.quizTitle && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>Cuestionario:</Typography>
              <Link component={RouterLink} to={PATHS.quiz.detail(quizId)}>{room.quizTitle}</Link>
            </Box>
          )}

        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant='body2' color='primary.dark'>
            { isCreated ? 'La sala está en borrador. Ábrela para que los participantes puedan acceder con el código de acceso.'
              : isOpened ? 'La sala está abierta. Proporciona el código de acceso a los participantes para que puedan unirse a la sala.'
                : isPaused ? 'La sala está pausada. Los participantes no pueden unirse hasta que la reabras.'
                  : isClosed ? 'La sala está cerrada. No se aceptan nuevas participaciones.'
                    : '' }
          </Typography>
        </Box>

      </Paper>

      <ListParticipationsSection room={room} />

      <ConfirmDialog
        open={openDialogOpen}
        title="Abrir sala"
        message="La sala se abrirá y los participantes podrán unirse con el código de acceso. ¿Deseas continuar?"
        loading={loadingState}
        onConfirm={async () => { await open(); refreshRoom(); setOpenDialogOpen(false) }}
        onClose={() => setOpenDialogOpen(false)}
      />

      <ConfirmDialog
        open={openDialogReview}
        title="Marcar sala como revisada"
        message="Las puntuaciones de los participantes y el ranking de la sala serán definitivos. Esta acción no se puede deshacer. ¿Deseas continuar?"
        loading={loadingReview}
        onConfirm={async () => { await markAsReview(); refreshRoom(); setOpenDialogReview(false) }}
        onClose={() => setOpenDialogReview(false)}
      />

      <ConfirmDialog
        open={openDialogClose}
        title="Cerrar"
        message="La sala se cerrará definitivamente y no se podrán unir más participantes. Esta acción no se puede deshacer. ¿Deseas continuar?"
        loading={loadingState}
        onConfirm={async () => { await close(); refreshRoom(); setOpenDialogClose(false) }}
        onClose={() => setOpenDialogClose(false)}
      />

      <ConfirmDialog
        open={openDialogDelete}
        title="Eliminar sala"
        message="¿Seguro que quieres eliminar esta sala? Se eliminarán todas las participaciones asociadas. Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={async () => { await remove(quizId, roomId); setOpenDialogDelete(false) }}
        onClose={() => setOpenDialogDelete(false)}
      />

    </Container>
  )
}

export default DetailRoomPage
