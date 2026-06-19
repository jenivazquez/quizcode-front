import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Typography, Paper, Container, Chip, Button,
  RadioGroup, FormControlLabel, Radio, Checkbox,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material'
import AnswerCodeEditor from '../../../shared/components/AnswerCodeEditor'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import SendIcon from '@mui/icons-material/Send'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { useDetailRoomToAnswer } from '../../room/hooks/useDetailRoomToAnswer'
import { useDetailQuizToAnswer } from '../../quiz/hooks/useDetailQuizToAnswer'
import { useListQuestionsToAnswer } from '../../question/hooks/useListQuestionsToAnswer'
import { useSubmitAnswers } from '../hooks/useSubmitAnswers'
import { formatTime } from '../utils/formatTime'
import { useTimerPart } from '../hooks/useTimerPart'
import { QuestionType } from '../../question/types/question'
import { PATHS } from '../../../app/routes/paths'
import type { QuestionDetail } from '../../question/types/question'

const AnswerQuizPartPage = () => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()
  const navigate = useNavigate()

  const { room, loading: loadingRoom, error: detailRoomError } = useDetailRoomToAnswer()
  const { quiz, loading: loadingQuiz, error: detailQuizError } = useDetailQuizToAnswer(room?.quizId)
  const { questions, loading: loadingQuestions, error: listQuestionError } = useListQuestionsToAnswer(room?.quizId)
  const { answers, handleAnswer, onSubmit, loading, error } = useSubmitAnswers(questions)

  const { timeLeft } = useTimerPart({ quiz, onExpire: () => { setOpenExpiredDialog(true); onSubmit(false) } })

  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false)
  const [openExpiredDialog, setOpenExpiredDialog] = useState(false)

  if (loadingRoom || loadingQuiz || loadingQuestions) return <PageLoader />
  if (!room) return <ErrorAlert message={detailRoomError} />
  if (!quiz) return <ErrorAlert message={detailQuizError} />
  if (!questions) return <ErrorAlert message={listQuestionError} />

  const isAnswered = (question: QuestionDetail) => {
    const answer = answers[question.id]
    return question.type === QuestionType.EDIT_CODE
      ? !!answer?.writtenAnswer && answer.writtenAnswer !== (question.baseCode ?? '')
      : (answer?.codeOptions?.length ?? 0) > 0
  }
  const emptyAnswersCount = questions.filter(question => !isAnswered(question)).length

  return (

    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 3, sm: 5 }, py: { xs: 3, sm: 4 }, textAlign: 'center', gap: 5, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant='h5' fontWeight={700}> {quiz.title}</Typography>
          <Typography variant='body1' color='text.secondary'>{quiz.description} </Typography>
          {timeLeft !== null && (
            <Chip
              icon={<TimerOutlinedIcon />}
              label={formatTime(timeLeft)}
              variant='outlined'
              sx={{ fontWeight: 700, fontSize: '1rem', px: 1, color: 'error.main', borderColor: 'error.main', '& .MuiChip-icon': { color: 'error.main' } }}
            />
          )}
        </Box>

      </Paper>

      <ErrorAlert message={detailRoomError} />
      <ErrorAlert message={detailQuizError} />
      <ErrorAlert message={listQuestionError} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>

        {questions.map((question, index) => {

          const answered = isAnswered(question)

          return (

            <Paper key={question.id} sx={{ borderRadius: 3, overflow: 'hidden' }}>

              <Box sx={{ display: 'flex', alignItems: 'stretch', bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ width: 52, flexShrink: 0, bgcolor: answered ? 'success.extra' : 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderColor: 'divider', transition: 'background-color 0.2s' }}>
                  <Typography variant='body1' fontWeight={800} color={answered ? 'success.dark' : 'text.secondary'}>
                    {index + 1}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 3 }, py: 2 }}>
                  <Typography variant='body1' fontWeight={600} sx={{ flex: 1 }}>
                    {question.statement}
                  </Typography>
                  <Typography variant='caption' fontWeight={600} color='primary.main' sx={{ flexShrink: 0 }}>
                    {question.score} pts
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ px: { xs: 3, sm: 4 }, py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {question.type === QuestionType.SINGLE_CHOICE && (
                  <RadioGroup 
                    value={answers[question.id]?.codeOptions?.[0] ?? ''} 
                    onChange={e => handleAnswer(question.id, question.type, e.target.value)}>
                    {question.options?.map(option => (
                      <FormControlLabel 
                        key={option.code} 
                        label={`${option.code}. ${option.value}`} 
                        value={option.code} 
                        control={ <Radio sx={{ color: 'grey.600', '&.Mui-checked': { color: 'grey.700' } }} /> } 
                      />
                    ))}
                  </RadioGroup>
                )}

                {question.type === QuestionType.MULTIPLE_CHOICE && (
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {question.options?.map(option => (
                      <FormControlLabel
                        key={option.code}
                        label={`${option.code}. ${option.value}`}
                        control={
                          <Checkbox
                            sx={{ color: 'grey.600', '&.Mui-checked': { color: 'grey.700' } }}
                            checked={answers[question.id]?.codeOptions?.includes(option.code) ?? false}
                            onChange={() => handleAnswer(question.id, question.type, option.code)}
                          />
                        }
                      />
                    ))}
                  </Box>
                )}

                {question.type === QuestionType.EDIT_CODE && (
                  <AnswerCodeEditor
                    value={answers[question.id]?.writtenAnswer ?? question.baseCode ?? ''}
                    onChange={value => handleAnswer(question.id, question.type, value)}
                  />
                )}

              </Box>
            </Paper>
          )
          
        })}

      </Box>

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <ErrorAlert message={error} />
        <Button variant='contained' size='large' disabled={loading} endIcon={<SendIcon />} onClick={() => setOpenSubmitConfirm(true)} sx={{ borderRadius: 2, fontWeight: 600, py: 1.5, px: 5, color: 'text.secondary' }}>
            Enviar respuestas
        </Button>
      </Box>

      <ConfirmDialog
        open={openSubmitConfirm}
        title='Enviar respuestas'
        message={`¿Estás seguro de que quieres enviar tus respuestas? ${emptyAnswersCount > 0 ? `Tienes ${emptyAnswersCount} preguntas sin responder.` : 'Esta acción no se puede deshacer.'}`}
        loading={loading}
        onConfirm={() => { setOpenSubmitConfirm(false); onSubmit() }}
        onClose={() => setOpenSubmitConfirm(false)}
      />

      <Dialog open={openExpiredDialog} onClose={() => setOpenExpiredDialog(false)} slotProps={{ paper: { sx: { borderRadius: 3, p: 3 } } }}>
        <DialogTitle sx={{ textAlign: 'center' }}>¡Tiempo agotado!</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <WarningAmberIcon sx={{ fontSize: 48, color: 'error.main' }} />
          </Box>
          <DialogContentText>
            El tiempo del cuestionario ha finalizado. Tus respuestas han sido enviadas automáticamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1 }}>
          <Button variant='contained' size='large' onClick={() => navigate(PATHS.part.ranking(roomId!, partId!))}>Aceptar</Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}

export default AnswerQuizPartPage
