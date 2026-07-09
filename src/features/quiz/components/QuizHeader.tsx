import { Box, Typography, Chip, Avatar } from '@mui/material'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import { STATUS_LABEL, sxStatusChip } from '../../room/constants/roomConstants'
import type { QuizDetailToAnswer } from '../types/quiz'
import type { QuizRoomDetail } from '../../room/types/room'

interface QuizHeaderProps {
  quiz: QuizDetailToAnswer
  room: QuizRoomDetail
}

const QuizHeader = ({ quiz, room }: QuizHeaderProps) => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3, py: 4, textAlign: 'center', gap: 2.5, backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textAlign: 'center' }}>

        <Typography variant='h6' fontWeight={600} color='text.primary'> {quiz.title} </Typography>

        <Typography variant='body1' color='text.secondary'> {quiz.description} </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography variant='body1' color='text.secondary'><b>Sala:</b> {room.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body1' color='text.secondary'><b>Estado:</b></Typography>
            <Chip label={STATUS_LABEL[room.status]} variant='outlined' size='small' sx={sxStatusChip[room.status]} />
          </Box>
        </Box>

        {quiz.hasLimit && quiz.limitMinutes ? (

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'error.extralight', color: 'error.dark', border: '1px solid', borderColor: 'error.dark' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h6' fontWeight={800} color='error.dark' lineHeight={1.2}> {quiz.limitMinutes} </Typography>
                <Typography variant='caption' fontWeight={700} color='error.dark' lineHeight={1}> MIN </Typography>
              </Box>
            </Avatar>
            <Typography variant='body2' color='text.secondary'> Solo tendrás <strong>{quiz.limitMinutes} minutos</strong> para responder al cuestionario </Typography>
          </Box>

        ) : (
          <Chip icon={<TimerOutlinedIcon />} label='Sin límite de tiempo' size='small' variant='outlined' />
        )}

      </Box>

    </Box>
  )
}

export default QuizHeader
