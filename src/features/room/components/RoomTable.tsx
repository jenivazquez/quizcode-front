import {
  Box, Typography, Chip, IconButton, Tooltip, Link,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SortTableHeaderCell from '../../quiz/components/SortTableHeaderCell'
import Pagination from '../../quiz/components/Pagination'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import { useDeleteRoom } from '../hooks/useDeleteRoom'
import { PATHS } from '../../../app/routes/paths'
import { STATUS_LABEL, sxStatusChip } from '../constants/roomConstants'
import { RoomStatus, type QuizRoomDetail } from '../types/room'

type RoomTableProps = {
  rooms: QuizRoomDetail[]
  quizId?: string
  onDeleteSuccess: () => void
}

type SortField = 'Nombre' | 'Cuestionario' | 'Descripción' | 'Estado' | 'Revisada' | 'Fecha'
type SortDirection = 'asc' | 'desc'
const reviewedOrder = (room: { status: string; reviewed: boolean }) => room.status !== RoomStatus.CLOSED ? 0 : room.reviewed ? 2 : 1

const RoomTable = ({ rooms, quizId, onDeleteSuccess }: RoomTableProps) => {

  const navigate = useNavigate()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteRoom(quizId ? PATHS.room.listByQuiz(quizId) : undefined)

  const [roomToDelete, setRoomToDelete] = useState<{ quizId: string; roomId: string } | null>(null)
  const [page, setPage] = useState(0)
  const [sortField, setSortField] = useState<SortField>('Fecha')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field as SortField)
      setSortDirection('asc')
    }
    setPage(0)
  }

  const comparators: Record<SortField, (a: QuizRoomDetail, b: QuizRoomDetail) => number> = {
    'Nombre':       (a, b) => a.name.localeCompare(b.name, 'es'),
    'Cuestionario': (a, b) => a.quizTitle.localeCompare(b.quizTitle, 'es'),
    'Descripción':  (a, b) => a.description.localeCompare(b.description, 'es'),
    'Estado':       (a, b) => a.status.localeCompare(b.status),
    'Revisada':     (a, b) => reviewedOrder(a) - reviewedOrder(b),
    'Fecha':        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  }

  const sortedRooms = [...rooms].sort((a, b) => {
    const order = comparators[sortField](a, b)
    return sortDirection === 'asc' ? order : -order
  })

  const rowsPerPage = 10
  const totalPages = Math.ceil(sortedRooms.length / rowsPerPage)
  const visibleRooms = sortedRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <ErrorAlert message={deleteError} />

      <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>

        <Table>

          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Nombre" />
              <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field={quizId ? 'Descripción' : 'Cuestionario'} hideBelow={quizId ? 'lg' : 'sm'} />
              <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Estado" align="center" hideBelow="sm" />
              <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Revisada" align="center" hideBelow={quizId ? 'sm' : 'md'} />
              <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Fecha" align="center" hideBelow="md" />
              <TableCell sx={{ fontWeight: 600, width: 20 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {rooms.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {quizId ? 'Este cuestionario todavía no tiene ninguna sala.' : 'Todavía no tienes ninguna sala.'}
                </TableCell>
              </TableRow>
            )}

            {visibleRooms.map((room) => (
              <TableRow key={room.id} hover onClick={() => navigate(PATHS.room.detail(room.quizId, room.id))} sx={{ cursor: 'pointer' }}>

                <TableCell sx={{ maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {room.name}
                </TableCell>

                <TableCell sx={{ maxWidth: quizId ? 300 : 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: { xs: 'none', [quizId ? 'lg' : 'sm']: 'table-cell' } }}>
                  {quizId
                    ? room.description
                    : (
                      <Link component={RouterLink} to={PATHS.quiz.detail(room.quizId)} onClick={(e) => e.stopPropagation()} sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {room.quizTitle}
                      </Link>
                    )
                  }
                </TableCell>

                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <Chip label={STATUS_LABEL[room.status]} variant="outlined" size="small" sx={sxStatusChip[room.status]} />
                </TableCell>

                <TableCell align="center" sx={{ display: { xs: 'none', [quizId ? 'sm' : 'md']: 'table-cell' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {room.status === RoomStatus.CLOSED
                      ? room.reviewed
                        ? <TaskAltIcon fontSize="small" sx={{ color: 'success.dark' }} />
                        : <HighlightOffIcon fontSize="small" sx={{ color: 'error.main' }} />
                      : <Typography variant="body2" color="text.disabled">—</Typography>
                    }
                  </Box>
                </TableCell>

                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, color: 'text.secondary' }}>
                  {new Date(room.createdAt).toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </TableCell>

                <TableCell sx={{ p: 0, height: '1px' }} onClick={(e) => e.stopPropagation()}>

                  <Box sx={{ display: 'flex', height: '100%' }}>

                    {room.status !== RoomStatus.CLOSED ? (
                      <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                        <Tooltip title="Modificar sala">
                          <IconButton size="small" onClick={() => navigate(PATHS.room.edit(room.quizId, room.id))} sx={{ borderRadius: 0, color: 'primary.main', width: '100%', height: '100%' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider' }} />
                    )}

                    {room.status !== RoomStatus.OPENED ? (
                      <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                        <Tooltip title="Eliminar sala">
                          <IconButton size="small" color="error" onClick={() => setRoomToDelete({ quizId: room.quizId, roomId: room.id })} sx={{ borderRadius: 0, width: '100%', height: '100%' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider' }} />
                    )}

                  </Box>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

      {totalPages > 0 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

      <ConfirmDialog
        open={!!roomToDelete}
        title="Eliminar sala"
        message="¿Seguro que quieres eliminar esta sala? Se eliminarán todas las participaciones asociadas. Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={async () => { const ok = await remove(roomToDelete!.quizId, roomToDelete!.roomId); setRoomToDelete(null); if (ok) onDeleteSuccess() }}
        onClose={() => setRoomToDelete(null)}
      />

    </>
  )
}

export default RoomTable
