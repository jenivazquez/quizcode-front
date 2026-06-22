import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, CircularProgress, Grow, IconButton, Tooltip } from '@mui/material'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { useListPartOwner } from '../hooks/useListPartOwner'
import { useDeletePart } from '../hooks/useDeletePart'
import { PartStatus } from '../types/participation'
import { REVIEW_STATUS, getPartColors } from '../constants/participationConstants'
import { formatTime } from '../utils/formatTime'
import { RoomStatus } from '../../room/types/room'
import type { QuizRoomDetail } from '../../room/types/room'
import type { PartDetail } from '../types/participation'
import { PATHS } from '../../../app/routes/paths'

interface ListPartSectionProps {
  room: QuizRoomDetail
}

const ListPartSection = ({ room }: ListPartSectionProps) => {

  const { quizId, roomId } = useParams<{ quizId: string, roomId: string }>()
  const navigate = useNavigate()

  const autoLoop = !room.reviewed && !(room.status === RoomStatus.CREATED)

  const { parts, error, refreshParts } = useListPartOwner(autoLoop)
  const { remove, loading: loadingDelete, error: deleteError } = useDeletePart()

  const [idPartToDelete, setIdPartToDelete] = useState<string | null>(null)

  return (

    <Box>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
          <Typography variant='h6' color='primary.dark'>Participantes</Typography>
        </Box>

        <Divider />

        <Box sx={{ px: 3, pt: 3, pb: 4 }}>

          {autoLoop && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={10} thickness={5} />
                <Typography variant='caption' color='text.secondary'>Actualizando en tiempo real</Typography>
              </Box>
            </Box>
          )}

          <ErrorAlert message={error} />
          <ErrorAlert message={deleteError} />

          {parts.length === 0 && (
            <Typography variant='body2' color='text.secondary' textAlign='center'>
              Todavía no hay participantes en esta sala.
            </Typography>
          )}

          {parts.length > 0 && (

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              
              {parts.map((part: PartDetail, index: number) => {

                const isPartInProgress = part.status === PartStatus.STARTED
                const { box: boxColor, text: textColor } = getPartColors(index, isPartInProgress)
                const { label: reviewLabel, color: reviewColor, icon: ReviewIcon } = REVIEW_STATUS[room.reviewed ? 'ROOM_REVIEWED' : part.reviewStatus]

                return (
                  <Grow key={part.id} in timeout={400 + index * 80}>
                    <Paper onClick={() => !isPartInProgress && navigate(PATHS.part.ownerDetail(quizId!, roomId!, part.id))} sx={{ borderRadius: 3, overflow: 'hidden', cursor: isPartInProgress ? 'default' : 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>

                        <Box sx={{ width: { xs: 60, sm: 80 }, flexShrink: 0, bgcolor: boxColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
                          {!isPartInProgress && index < 3 && <WorkspacePremiumIcon sx={{ fontSize: 26, color: textColor }} />}
                          <Typography variant='body1' fontWeight={800} lineHeight={1} color={textColor}> {index + 1} </Typography>
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 }, px: { xs: 1.5, sm: 3 }, py: 2, bgcolor: boxColor + '60' }}>

                          <Typography variant='body1' fontWeight={600} noWrap sx={{ flex: 1 }}>{part.username}</Typography>

                          {isPartInProgress && (
                            <Typography variant='body2' color={textColor} sx={{ display: { xs: 'none', sm: 'block' }, flexShrink: 0 }}>
                              En curso…
                            </Typography>
                          )}

                          {!isPartInProgress && (
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                              <ReviewIcon sx={{ fontSize: 16, color: reviewColor }} />
                              <Typography variant='body2' color={reviewColor}>{reviewLabel}</Typography>
                            </Box>
                          )}

                          {part.totalScore && (
                            <Typography variant='body1' fontWeight={700} color='primary.main' sx={{ width: 72, textAlign: 'right', flexShrink: 0 }}>
                              {part.totalScore} pts
                            </Typography>
                          )}

                          {part.totalTime && (
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                              <TimerOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                              <Typography variant='body2' color='text.secondary'>{formatTime(part.totalTime)}</Typography>
                            </Box>
                          )}

                        </Box>

                        <Box onClick={e => e.stopPropagation()} sx={{ borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                          <Tooltip title='Eliminar participación'>
                            <IconButton color='error' onClick={() => setIdPartToDelete(part.id)} sx={{ borderRadius: 0, px: { xs: 1, sm: 1.5 } }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                      </Box>
                    </Paper>
                  </Grow>
                )
              })}

            </Box>

          )}

        </Box>

      </Paper>

      <ConfirmDialog
        open={!!idPartToDelete}
        title='Eliminar participación'
        message='¿Seguro que quieres eliminar esta participación? Se eliminarán todas las respuestas asociadas. Esta acción no se puede deshacer.'
        loading={loadingDelete}
        onConfirm={ async() => { await remove(idPartToDelete!); refreshParts(); setIdPartToDelete(null) }}
        onClose={() => setIdPartToDelete(null)}
      />

    </Box>
  )
}

export default ListPartSection
