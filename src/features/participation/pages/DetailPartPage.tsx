import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Typography, Paper, Container, Divider,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import CodeViewer from '../../../shared/components/CodeViewer'
import { useDetailRoomToAnswer } from '../../room/hooks/useDetailRoomToAnswer'
import { useDetailPart } from '../hooks/useDetailPart'
import { useDetailQuizToAnswer } from '../../quiz/hooks/useDetailQuizToAnswer'
import { useListQuestionsToReview } from '../../question/hooks/useListQuestionsToReview'
import { PATHS } from '../../../app/routes/paths'
import { QuestionType } from '../../question/types/question'
import { REVIEW_STATUS } from '../constants/participationConstants'
import { formatTime } from '../utils/formatTime'


const DetailPartPage = () => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()

  const { room, loading: loadingRoom, error: detailRoomError } = useDetailRoomToAnswer()
  const { quiz, loading: loadingQuiz, error: detailQuizError } = useDetailQuizToAnswer(room?.quizId)
  const { part, loading: loadingPart, error: detailPartError } = useDetailPart()
  const { questions, loading: loadingQuestions, error: questionsError } = useListQuestionsToReview(room?.quizId)
  const navigate = useNavigate()

  if (loadingRoom || loadingQuiz || loadingPart || loadingQuestions) return <PageLoader />
  if (!room) return <ErrorAlert message={detailRoomError} />
  if (!quiz) return <ErrorAlert message={detailQuizError} />
  if (!part) return <ErrorAlert message={detailPartError} />
  if (!questions) return <ErrorAlert message={questionsError} />

  const maxScore = questions.reduce((sum, question) => sum + question.score, 0)

  const { label: reviewLabel, color: reviewColor, icon: ReviewIcon } = REVIEW_STATUS[part.reviewStatus]

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, px: 3, py: 1.5, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
          <ReviewIcon fontSize='small' sx={{ color: reviewColor }} />
          <Typography variant='body1' fontWeight={600} color={reviewColor}>{reviewLabel}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 3, sm: 5 }, py: { xs: 3, sm: 5 }, textAlign: 'center', gap: 2, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <Typography variant='h5' fontWeight={700}>{quiz.title}</Typography>
          <Typography variant='body1' color='text.secondary'>Usuario: {part.username}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 5, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <TimerOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant='body2' fontWeight={600} color='text.secondary' lineHeight={1}>{formatTime(part.totalTime)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, px: 3, py: 1, borderRadius: 3, bgcolor: theme => alpha(theme.palette.primary.extralight!, 0.5), border: '1px solid', borderColor: 'primary.light' }}>
            <Typography variant='h5' fontWeight={800} color='primary.main' lineHeight={1}> {part.totalScore ?? '0'} </Typography>
            <Typography variant='h6' fontWeight={400} color='text.secondary'>/ {maxScore} pts</Typography>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', px: 3, py: 1.5 }}>
          <Box onClick={() => navigate(PATHS.part.ranking(roomId!, partId!))}
            sx={{  display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'pointer',
              '&:hover .nav-label': { textDecoration: 'underline' },
              '&:hover .nav-arrow': { transform: 'translateX(-3px)' },
            }} >
            <ChevronLeftIcon className='nav-arrow' fontSize='small' color='primary' sx={{ transition: 'transform 0.15s' }} />
            <Typography className='nav-label' variant='body2' fontWeight={500} color='primary'>Volver a la clasificación</Typography>
          </Box>
        </Box>

      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {questions.map((question, index) => {

          const answer = part.answers.find(answer => answer.questionId === question.id)

          return (

            <Paper key={question.id} sx={{ borderRadius: 3, overflow: 'hidden' }}>

              <Box sx={{ display: 'flex', alignItems: 'stretch', bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ width: 52, flexShrink: 0, bgcolor: answer?.isCorrect ? 'success.extra' : '#f5d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid', borderColor: 'divider' }}>
                  <Typography variant='body1' fontWeight={800} color={answer?.isCorrect ? 'success.dark' : 'error.dark'}> {index + 1} </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 3 }, py: 2 }}>
                  <Typography variant='body1' fontWeight={600} sx={{ flex: 1 }}>{question.statement}</Typography>
                  <Typography variant='caption' fontWeight={600} color='primary.main' sx={{ flexShrink: 0 }}> {answer?.score ?? 0} / {question.score} pts </Typography>
                </Box>
              </Box>

              <Box sx={{ px: { xs: 3, sm: 4 }, py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {(question.type === QuestionType.SINGLE_CHOICE || question.type === QuestionType.MULTIPLE_CHOICE) && (

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                    {question.options?.map(option => {

                      const chosen  = answer?.codeOptions?.includes(option.code) ?? false
                      const color = option.isValid ? 'success.dark' : (chosen ? 'error.main' : 'text.secondary')
                      const Icon = option.isValid && chosen  ? CheckCircleOutlineIcon : (!option.isValid && chosen ? CancelOutlinedIcon : RadioButtonUncheckedIcon)

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
                    {answer?.feedback && (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <Typography variant='body2' fontWeight={600} color='text.secondary' sx={{ flexShrink: 0 }}> Comentarios:</Typography>
                          <Typography variant='body2' color='text.secondary'>{answer.feedback}</Typography>
                        </Box>
                        <Divider />
                      </>
                    )}

                    {answer?.writtenAnswer ? (
                      <CodeViewer value={answer.writtenAnswer} />
                    ) : (
                      <Typography variant='body2' color='text.disabled'>Sin respuesta</Typography>
                    )}
                    
                  </Box>

                )}

              </Box>
            </Paper>
          )
        })}
      </Box>

    </Container>
  )
}

export default DetailPartPage
