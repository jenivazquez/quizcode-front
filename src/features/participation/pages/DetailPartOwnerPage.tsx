import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Typography, Paper, Container, Divider, Tooltip, IconButton, Button,
  TextField, Switch, FormControlLabel,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import CodeViewer from '../../../shared/components/CodeViewer'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { useDetailRoom } from '../../room/hooks/useDetailRoom'
import { useDetailPartOwner } from '../hooks/useDetailPartOwner'
import { useDeletePart } from '../hooks/useDeletePart'
import { useReviewPart } from '../hooks/useReviewPart'
import { useListQuestionsToReview } from '../../question/hooks/useListQuestionsToReview'
import { PATHS } from '../../../app/routes/paths'
import { QuestionType } from '../../question/types/question'
import { REVIEW_STATUS } from '../constants/participationConstants'
import { ReviewStatus } from '../types/participation'
import { formatTime } from '../utils/formatTime'

const DetailPartOwnerPage = () => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const navigate = useNavigate()

  const { room, loading: loadingRoom, error: roomError } = useDetailRoom()
  const { part, loading: loadingPart, error: partError, refreshPart } = useDetailPartOwner()
  const { questions, loading: loadingQuestions, error: questionsError } = useListQuestionsToReview(room?.quizId)
  const { remove, loading: loadingDelete, error: deleteError } = useDeletePart()
  const { isEditing, reviewData, initEdit, onCancel, updateField, onSubmit, loading: loadingReview, error: reviewError } = useReviewPart(questions ?? [], part)

  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  if (loadingRoom || loadingPart || loadingQuestions) return <PageLoader />
  if (!room) return <ErrorAlert message={roomError} />
  if (!part) return <ErrorAlert message={partError} />
  if (!questions) return <ErrorAlert message={questionsError} />

  const maxScore = questions.reduce((sum, question) => sum + question.score, 0)
  const canReview = !room.reviewed && part.reviewStatus !== ReviewStatus.PENDING

  const { label: reviewLabel, color: reviewColor, icon: ReviewIcon } = REVIEW_STATUS[room.reviewed ? 'ROOM_REVIEWED' : part.reviewStatus]

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>

          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />

          <Box sx={theme => ({ width: { xs: '100%', sm: 'auto' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.5, borderBottom: { xs: `1px solid ${theme.palette.divider}`, sm: 'none' } })}>
            <ReviewIcon fontSize='small' sx={{ color: reviewColor }} />
            <Typography variant='body1' fontWeight={600} color={reviewColor}>{reviewLabel}</Typography>
          </Box>

          <Box sx={{ flex: { sm: 1 }, width: { xs: '100%', sm: 'auto' }, display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Box sx={theme => ({ flex: { xs: 1, sm: 'none' }, borderLeft: { sm: `1px solid ${theme.palette.divider}` }, display: 'flex' })}>
              <Tooltip title='Modificar puntuación'>
                <span style={{ display: 'flex', flex: 1 }}>
                  <IconButton color='primary' onClick={initEdit} disabled={isEditing || !canReview} sx={{ borderRadius: 0, px: 2, width: '100%' }}>
                    <EditIcon fontSize='medium' />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
            <Box sx={{ flex: { xs: 1, sm: 'none' }, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
              <Tooltip title='Eliminar participación'>
                <span style={{ display: 'flex', flex: 1 }}>
                  <IconButton color='error' onClick={() => setOpenDialogDelete(true)} disabled={isEditing} sx={{ borderRadius: 0, px: 2, width: '100%' }}>
                    <DeleteIcon fontSize='medium' />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 3, sm: 5 }, py: { xs: 3, sm: 5 }, textAlign: 'center', gap: 2, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <Typography variant='h6'>Participante: {part.username}</Typography>
          <Typography variant='body1' color='text.secondary'><b>Cuestionario:</b> {room.quizTitle}</Typography>
          <Typography variant='body1' color='text.secondary'><b>Sala:</b> {room.name}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 5, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <TimerOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant='body2' fontWeight={600} color='text.secondary' lineHeight={1}>{formatTime(part.totalTime)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, px: 3, py: 1, borderRadius: 3, bgcolor: theme => alpha(theme.palette.primary.extralight!, 0.5), border: '1px solid', borderColor: 'primary.light' }}>
            <Typography variant='h5' fontWeight={800} color='primary.main' lineHeight={1}> {(part.totalScore ?? '_')} </Typography>
            <Typography variant='h6' fontWeight={400} color='text.secondary'>/ {maxScore} puntos</Typography>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', px: 3, py: 1.5 }}>
          <Box onClick={() => navigate(PATHS.room.detail(quizId!, roomId!))}
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'pointer',
              '&:hover .nav-label': { textDecoration: 'underline' },
              '&:hover .nav-arrow': { transform: 'translateX(-3px)' },
            }}>
            <ChevronLeftIcon className='nav-arrow' fontSize='small' color='primary' sx={{ transition: 'transform 0.15s' }} />
            <Typography className='nav-label' variant='body2' fontWeight={500} color='primary'>Volver a la sala</Typography>
          </Box>
        </Box>

      </Paper>

      <ErrorAlert message={deleteError} />
      <ErrorAlert message={reviewError} />

      {isEditing && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 3, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'primary.light', bgcolor: theme => alpha(theme.palette.primary.main, 0.04) }}>
          <InfoOutlinedIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.1, flexShrink: 0 }} />
          <Typography variant='body2' color='text.secondary'>
            A continuación, puedes <strong>modificar</strong> la corrección realizada por la IA. Las preguntas tipo test solo permiten añadir un comentario, pero en el resto de preguntas puedes cambiar también la puntuación.
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {questions.map((question, index) => {

          const answer     = part.answers.find(a => a.questionId === question.id)
          const reviewItem = isEditing ? reviewData.find(r => r.questionId === question.id) : null

          return (

            <Paper key={question.id} sx={{ borderRadius: 3, overflow: 'hidden' }}>

              <Box sx={{ display: 'flex', alignItems: 'stretch', bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ width: 52, flexShrink: 0, bgcolor: (answer?.isCorrect==null ? 'grey.100' : (answer?.isCorrect ? 'success.extra' : '#f5d0d0')) , display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderColor: 'divider' }}>
                  <Typography variant='body1' fontWeight={800} color= {(answer?.isCorrect==null ? 'text.secondary' : (answer?.isCorrect ? 'success.dark' : 'error.dark'))}> {index + 1} </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 3 }, py: 2 }}>
                  <Typography variant='body1' fontWeight={600} sx={{ flex: 1 }}>{question.statement}</Typography>
                  <Typography variant='caption' fontWeight={600} color='primary.main' sx={{ flexShrink: 0 }}> {answer?.score ?? '_'} / {question.score} pts </Typography>
                </Box>
              </Box>

              <Box sx={{ px: { xs: 3, sm: 4 }, py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {(question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.MULTIPLE_CHOICE) && (

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                    {question.options?.map(option => {

                      const chosen = answer?.codeOptions?.includes(option.code) ?? false
                      const color  = option.isValid ? 'success.dark' : (chosen ? 'error.main' : 'text.secondary')
                      const Icon   = option.isValid && chosen ? CheckCircleOutlineIcon : (!option.isValid && chosen ? CancelOutlinedIcon : RadioButtonUncheckedIcon)

                      return (
                        <Box key={option.code} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Icon sx={{ fontSize: 18, color, flexShrink: 0 }} />
                          <Typography variant='body2' color={color} fontWeight={chosen ? 700 : 400}> {option.code}. {option.value} </Typography>
                        </Box>
                      )

                    })}

                  </Box>

                )}

                {question.type === QuestionType.EDIT_CODE && (

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {answer?.writtenAnswer ? (
                      <CodeViewer value={answer.writtenAnswer} />
                    ) : (
                      <Typography variant='body2' color='text.disabled'>Sin respuesta</Typography>
                    )}
                  </Box>
                  
                )}

                {!isEditing && answer?.feedback && (
                  <>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Typography variant='body2' fontWeight={600} color='text.secondary' sx={{ flexShrink: 0 }}>Comentarios:</Typography>
                      <Typography variant='body2' color='text.secondary'>{answer.feedback}</Typography>
                    </Box>
                  </>
                )}

                {isEditing && reviewItem && (() => {

                  return (
                    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch', gap: 2 }}>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, gap: 2, justifyContent: 'space-between' }}>
                          <TextField
                            label='Puntuación'
                            type='number'
                            size='small'
                            required
                            value={reviewItem.score}
                            onChange={e => updateField(question.id, 'score', Math.max(0, Math.min(question.score, Number(e.target.value))))}
                            slotProps={{ htmlInput: { min: 0, max: question.score } }}
                            sx={{ width: 120 }}
                          />
                          <FormControlLabel
                            label={<Typography variant='body2' fontWeight={500} sx={{ minWidth: 76 }}>{reviewItem.isCorrect ? 'Correcto' : 'Incorrecto'}</Typography>}
                            control={
                              <Switch
                                checked={reviewItem.isCorrect}
                                onChange={e => updateField(question.id, 'isCorrect', e.target.checked)}
                                color='success'
                              />
                            }
                          />
                        </Box>

                        <TextField
                          label='Comentarios'
                          size='small'
                          multiline
                          rows={3}
                          placeholder='Escribe aquí tus comentarios sobre la respuesta...'
                          value={reviewItem.feedback ?? ''}
                          onChange={e => updateField(question.id, 'feedback', e.target.value)}
                          slotProps={{ htmlInput: { maxLength: 500 }, inputLabel: { shrink: true } }}
                          sx={{ flex: 1, minWidth: 200, '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' } }}
                        />

                      </Box>
                    </Box>
                  )
                })()}

              </Box>
            </Paper>
          )
        })}
      </Box>

      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button variant='outlined' onClick={onCancel} disabled={loadingReview}>
            Cancelar
          </Button>
          <Button variant='contained' onClick={async () => { await onSubmit(); refreshPart() }} disabled={loadingReview}>
            Guardar cambios
          </Button>
        </Box>
      )}

      <ConfirmDialog
        open={openDialogDelete}
        title='Eliminar participación'
        message='¿Seguro que quieres eliminar esta participación? Se eliminarán todas las respuestas asociadas. Esta acción no se puede deshacer.'
        loading={loadingDelete}
        onConfirm={async () => { await remove(part.id); setOpenDialogDelete(false) }}
        onClose={() => setOpenDialogDelete(false)}
      />

    </Container>
  )
}

export default DetailPartOwnerPage
