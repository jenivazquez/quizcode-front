import {
  Box, Typography, Paper,
  Container, Chip, IconButton, Tooltip, Button,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PublishIcon from '@mui/icons-material/Publish'
import UndoIcon from '@mui/icons-material/Undo'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDetailQuiz } from '../hooks/useDetailQuiz'
import { useAuth } from '../../../shared/hooks/useAuth'
import { useStateQuiz } from '../hooks/useStateQuiz'
import { useDeleteQuiz } from '../hooks/useDeleteQuiz'
import { PATHS } from '../../../app/routes/paths'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import ListQuestionSection from '../../question/sections/ListQuestionSection'
import { QuizStatus } from '../types/quiz'
import { STATUS_LABEL, sxStatusChip } from '../constants/quizConstants'

const DetailQuizPage = () => {

  const { id: quizId } = useParams<{ id: string }>()
  const { userId } = useAuth()

  const { quiz, loading: loadingQuiz, error, refreshQuiz } = useDetailQuiz()
  const { publish, unpublish, loading: loadingState, error: stateError } = useStateQuiz()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteQuiz()
  const navigate = useNavigate()
  
  const [openDialogPublish, setOpenDialogPublish] = useState(false)
  const [openDialogUnpublish, setOpenDialogUnpublish] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  if (loadingQuiz) return <PageLoader />
  if (!quiz || !quizId || !userId) return <ErrorAlert message={error} />

  const isEditable = quiz.status === QuizStatus.CREATED
  const isPublished = quiz.status === QuizStatus.PUBLISHED
  const createdAt = new Date(quiz.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  return (

    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Paper sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }}>

        <Box sx={{ display: 'flex', alignItems: 'stretch', bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            {isEditable && (
              <Button onClick={() => setOpenDialogPublish(true)} disabled={loadingState} startIcon={<PublishIcon/>} sx={{ borderRadius: 0, color: 'success.dark', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                Publicar cuestionario
              </Button>
            )}
            {isPublished && (
              <Button onClick={() => setOpenDialogUnpublish(true)} disabled={loadingState} startIcon={<UndoIcon/>} sx={{ borderRadius: 0, color: 'error.main', px: 2.5, borderRight: '1px solid', borderColor: 'divider' }}>
                Despublicar cuestionario
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1.5 }}>
            <Typography variant="body1" >Estado:</Typography>
            <Chip label={STATUS_LABEL[quiz.status]} variant="outlined" sx={sxStatusChip[quiz.status]}/>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end'}}>
            {isEditable && (
              <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                <Tooltip title="Modificar cuestionario">
                  <IconButton onClick={() => navigate(PATHS.update(quizId!))} sx={{ borderRadius: 0, color: 'primary.main', px: 2 }}>
                    <EditIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box sx={{ borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
              <Tooltip title="Eliminar cuestionario">
                <IconButton color="error" onClick={() => setOpenDialogDelete(true)} sx={{ borderRadius: 0, px: 2 }}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

        </Box>


        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 5, py: 4, textAlign: 'center', gap: 3, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
          <Typography variant="h5">{quiz.title}</Typography>

          <Typography variant="body1" color="text.secondary">{quiz.description}</Typography>

          {quiz.hasLimit && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Tiempo límite:</Typography>
              <Chip icon={<AccessTimeIcon />} label={`${quiz.limitMinutes} min`} size="small" variant="outlined" />
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>Fecha de alta:</Typography>
            <Chip icon={<CalendarTodayIcon />} label={createdAt} size="small" variant="outlined" />
          </Box>

        </Box>

        <ErrorAlert message={error ?? stateError ?? deleteError} />

      </Paper>
      
      <ListQuestionSection isEditable={isEditable} />

      <ConfirmDialog
        open={openDialogUnpublish}
        title="Despublicar cuestionario"
        message="El cuestionario volverá al estado borrador y podrás modificarlo de nuevo. ¿Deseas continuar?"
        loading={loadingState}
        onConfirm={async () => { await unpublish(); refreshQuiz(); setOpenDialogUnpublish(false) }}
        onClose={() => setOpenDialogUnpublish(false)}
      />

      <ConfirmDialog
        open={openDialogPublish}
        title="Publicar cuestionario"
        message="Una vez publicado, el cuestionario no se podrá modificar a menos que vuelvas al estado borrador. ¿Deseas continuar?"
        loading={loadingState}
        onConfirm={async () => { await publish(); refreshQuiz(); setOpenDialogPublish(false) }}
        onClose={() => setOpenDialogPublish(false)}
      />

      <ConfirmDialog
        open={openDialogDelete}
        title="Eliminar cuestionario"
        message="¿Seguro que quieres eliminar este cuestionario? Se eliminarán sus preguntas y respuestas. Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={async () => { await remove(quizId!); navigate(-1) }}
        onClose={() => setOpenDialogDelete(false)}
      />

    </Container>
  )
}

export default DetailQuizPage
