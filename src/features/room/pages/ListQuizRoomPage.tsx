import { Box, Container, Typography, Button, Link, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { useListQuizRooms } from '../hooks/useListQuizRooms'
import RoomTable from '../components/RoomTable'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { PATHS } from '../../../app/routes/paths'

const ListQuizRoomPage = () => {

  const { quizId } = useParams<{ quizId: string }>()

  const { rooms, loading, error: listError, refreshRooms } = useListQuizRooms()

  const navigate = useNavigate()

  if (loading) return <PageLoader />
  if (listError) return <ErrorAlert message={listError} />

  return (

    <Container maxWidth="lg" sx={{ py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 7, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Salas de cuestionario</Typography>
          {rooms[0]?.quizTitle && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 3 }}>
              <Typography variant="body1" fontWeight={500}>Cuestionario:</Typography>
              <Link component={RouterLink} to={PATHS.quiz.detail(quizId!)} underline="always">{rooms[0].quizTitle}</Link>
            </Box>
          )}
        </Box>

        <Box sx={{ px: 3, pt: 3, pb: 8 }}>

          <Box sx={{ mt: 4, mb: 1 }}>
            <Button startIcon={<AddIcon />} onClick={() => navigate(PATHS.room.createForQuiz(quizId!))}>
              Nueva sala
            </Button>
          </Box>

          <RoomTable rooms={rooms} quizId={quizId} onDeleteSuccess={refreshRooms} />

        </Box>

      </Paper>

    </Container>
  )
}

export default ListQuizRoomPage
