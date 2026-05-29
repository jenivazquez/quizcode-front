import { Box, Container, Typography, Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useListRooms } from '../hooks/useListRooms'
import RoomTable from '../components/RoomTable'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { PATHS } from '../../../app/routes/paths'

const ListRoomPage = () => {

  const { rooms, loading, error: listError, refreshRooms } = useListRooms()

  const navigate = useNavigate()

  if (loading && rooms.length === 0) return <PageLoader />
  if (listError) return <ErrorAlert message={listError} />

  return (

    <Container maxWidth="lg" sx={{ py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 7, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Mis salas</Typography>
          <Typography variant="body2" color="text.secondary" mt={3}>Gestiona y organiza tus salas</Typography>
        </Box>

        <Box sx={{ px: 3, pt: 3, pb: 8 }}>

          <Box sx={{ mt: 4, mb: 1 }}>
            <Button startIcon={<AddIcon />} onClick={() => navigate(PATHS.room.create)}>
              Nueva sala
            </Button>
          </Box>

          <RoomTable rooms={rooms} onDeleteSuccess={refreshRooms} />

        </Box>

      </Paper>

    </Container>
  )
}

export default ListRoomPage
