import { formatTime } from '../utils/formatTime'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Container, CircularProgress, Grow, Chip } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import PageLoader from '../../../shared/components/PageLoader'
import { useDetailRoomToAnswer } from '../../room/hooks/useDetailRoomToAnswer'
import { useRankingPart } from '../hooks/useRankingPart'
import { useDetailQuizToAnswer } from '../../quiz/hooks/useDetailQuizToAnswer'
import { useDetailPart } from '../hooks/useDetailPart'
import { ReviewStatus } from '../types/participation'
import type { PartRankingDetail } from '../types/participation'
import { STATUS_LABEL, sxStatusChip } from '../../room/constants/roomConstants'
import { getPartColors } from '../constants/participationConstants'
import { PATHS } from '../../../app/routes/paths'

const RankingPartPage = () => {

  const { roomId, partId } = useParams<{ roomId: string, partId: string }>()

  const { room, loading: loadingRoom, error: detailRoomError } = useDetailRoomToAnswer(true)
  const { quiz, loading: loadingQuiz, error: detailQuizError } = useDetailQuizToAnswer(room?.quizId)
  const { ranking, loading: loadingRanking,  error: rankingError } = useRankingPart(!room?.reviewed)
  const { part: currentPart, loading: loadingPart, error: detailPartError } = useDetailPart()
  const navigate = useNavigate()

  if (loadingRoom || loadingQuiz ||loadingRanking || loadingPart) return <PageLoader />
  if (!room) return <ErrorAlert message={detailRoomError} />
  if (!quiz) return <ErrorAlert message={detailQuizError} />
  if (!currentPart) return <ErrorAlert message={detailPartError} />

  const pendingMyReview = ranking.find(entry => entry.username === currentPart.username)?.reviewStatus === ReviewStatus.PENDING

  return (

    <Container maxWidth='lg' sx={{ py: { xs: 3, sm: 4 } }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1.5, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
          {room.reviewed ? (
            <>
              <TaskAltIcon fontSize='small' sx={{ color: 'success.dark' }} />
              <Typography variant='body1' fontWeight={600} color='success.dark'>Clasificación definitiva</Typography>
            </>
          ) : (
            <>
              <WarningAmberIcon fontSize='small' sx={{ color: 'error.main' }} />
              <Typography variant='body1' fontWeight={600} color='error.main'>Clasificación pendiente de confirmación</Typography>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 3, sm: 5 }, py: { xs: 3, sm: 4 }, textAlign: 'center', gap: 3, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
          <EmojiEventsIcon sx={{ fontSize: 52, color: '#f0c040' }} />
          <Typography variant='h5' fontWeight={700}>Clasificación</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2' color='text.secondary' fontWeight={500}>Cuestionario:</Typography>
            <Typography variant='body2' color='text.secondary'>{quiz.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2' color='text.secondary'>Estado de la sala:</Typography>
            <Chip label={STATUS_LABEL[room.status]} variant='outlined' size='small' sx={sxStatusChip[room.status]} />
          </Box>
        </Box>

        {!pendingMyReview && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', px: 3, py: 1.5 }}>
            <Box onClick={() => navigate(PATHS.part.detail(roomId!, partId!))}
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'pointer',
                '&:hover .nav-label': { textDecoration: 'underline' },
                '&:hover .nav-arrow': { transform: 'translateX(3px)' },
              }}>
              <Typography className='nav-label' variant='body2' fontWeight={500} color='primary'>Ver mis respuestas</Typography>
              <ChevronRightIcon className='nav-arrow' fontSize='small' color='primary' sx={{ transition: 'transform 0.15s' }} />
            </Box>
          </Box>
        )}
      </Paper>

      <ErrorAlert message={rankingError} />

      {!room.reviewed && (
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={10} thickness={5} />
            <Typography variant='caption' color='text.secondary'>Actualizando en tiempo real</Typography>
          </Box>
          <Typography variant='caption' color='text.disabled' textAlign='center'>Las puntuaciones de cada participante aparecerán cuando sean corregidas por la IA, pero la puntuación no será definitiva hasta que el organizador la revise.</Typography>
        </Box>
      )}

      {ranking.length > 0 &&  (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

          {ranking.map((part: PartRankingDetail, index: number) => {

            const isCurrentUser = part.username === currentPart.username
            const { box: boxColor, text: textColor } = getPartColors(index, false)

            return (
              <Grow key={part.username} in timeout={400 + index * 80}>
                <Paper sx={{ borderRadius: 3, overflow: 'hidden', ...(isCurrentUser && { borderLeft: '6px solid', borderColor: textColor }) }}>
                  <Box sx={{ display: 'flex', alignItems: 'stretch' }}>

                    <Box sx={{ width: { xs: 60, sm: 80 }, flexShrink: 0, bgcolor: boxColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
                      {index < 3 && <WorkspacePremiumIcon sx={{ fontSize: 26, color: textColor }} />}
                      <Typography variant='body1' fontWeight={800} lineHeight={1} color={textColor}> {index + 1} </Typography>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 4 }, px: { xs: 1.5, sm: 4 }, py: 2, bgcolor: boxColor + '60' }}>
                      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant='body1' fontWeight={isCurrentUser ? 700 : 500} noWrap>{part.username}</Typography>
                        {isCurrentUser && <Typography variant='body2' fontWeight={600} color={textColor} sx={{ flexShrink: 0 }}>(Tú)</Typography>}
                      </Box>
                      <Typography variant='body1' fontWeight={700} color='primary.main' sx={{ width: 72, textAlign: 'right', flexShrink: 0 }}>
                        {part.totalScore} pts
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                        <TimerOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant='body2' color='text.secondary'>{formatTime(part.totalTime)}</Typography>
                      </Box>
                    </Box>

                  </Box>
                </Paper>
              </Grow>
            )
          })}
        </Box>

      )}
      
    </Container>
  )
}

export default RankingPartPage
