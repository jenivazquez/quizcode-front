import {
  Box, Container, Typography, Chip, IconButton, Tooltip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SortTableHeaderCell from '../components/SortTableHeaderCell'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useListQuiz } from '../hooks/useListQuiz'
import { useDeleteQuiz } from '../hooks/useDeleteQuiz'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { PATHS } from '../../../app/routes/paths'
import { STATUS_LABEL, sxStatusChip } from '../constants/quizConstants'
import { QuizStatus, type QuizDetail } from '../types/quiz'
import Pagination from '../components/Pagination'

type SortField = 'Título' | 'Descripción' | 'Estado' | 'Duración' | 'Fecha'
type SortDirection = 'asc' | 'desc'

const ListQuizPage = () => {

  const { quizzes, loading: loadingQuizzes, error: listError, refreshQuizzes } = useListQuiz()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteQuiz()

  const [idQuizToDelete, setIdQuizToDelete] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [sortField, setSortField] = useState<SortField>('Fecha')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const navigate = useNavigate()

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field as SortField)
      setSortDirection('asc')
    }
    setPage(0)
  }

  const comparators: Record<SortField, (a: QuizDetail, b: QuizDetail) => number> = {
    'Título':      (a, b) => a.title.localeCompare(b.title, 'es'),
    'Descripción': (a, b) => a.description.localeCompare(b.description, 'es'),
    'Estado':      (a, b) => a.status.localeCompare(b.status),
    'Duración':    (a, b) => (a.limitMinutes ?? Infinity) - (b.limitMinutes ?? Infinity),
    'Fecha':       (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  }

  const sortedQuizzes = [...quizzes].sort((a, b) => {
    const order = comparators[sortField](a, b)
    return sortDirection === 'asc' ? order : -order
  })

  const rowsPerPage = 10
  const totalPages = Math.ceil(sortedQuizzes.length / rowsPerPage)
  const visibleQuizzes = sortedQuizzes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (loadingQuizzes && quizzes.length === 0) return <PageLoader />
  if (listError) return <ErrorAlert message={listError} />

  return (

    <Container maxWidth="lg" sx={{ py: 3 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 7, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Mis cuestionarios</Typography>
          <Typography variant="body2" color="text.secondary" mt={3}>Gestiona y organiza tus cuestionarios</Typography>
        </Box>

        <Box sx={{ px: 3, pt: 3, pb: 8 }}>

          <ErrorAlert message={deleteError} />

          <Box sx={{ mt: 4, mb: 1 }}>
            <Button startIcon={<AddIcon />} onClick={() => navigate(PATHS.quiz.create)}>
                  Nuevo cuestionario
            </Button>
          </Box>

          <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                
            <Table>

              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Título" />
                  <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Descripción" hideBelow="lg" />
                  <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Estado" align="center" hideBelow="sm" />
                  <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Duración" align="center" hideBelow="md" />
                  <SortTableHeaderCell sortField={sortField} sortDirection={sortDirection} onSort={handleSort} field="Fecha" align="center" hideBelow="sm" />
                  <TableCell sx={{ fontWeight: 600, width: 20 }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {quizzes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                          Todavía no tienes ningún cuestionario.
                    </TableCell>
                  </TableRow>
                )}

                {visibleQuizzes.map((quiz) => (
                  <TableRow key={quiz.id} hover onClick={() => navigate(PATHS.quiz.detail(quiz.id))} sx={{ cursor: 'pointer' }}>

                    <TableCell sx={{ maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{quiz.title}</TableCell>

                    <TableCell sx={{ maxWidth: 300, display: { xs: 'none', lg: 'table-cell' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {quiz.description}
                    </TableCell>

                    <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Chip label={STATUS_LABEL[quiz.status]} variant="outlined" size="small" sx={sxStatusChip[quiz.status]} />
                    </TableCell>

                    <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, color: 'text.secondary' }}>
                      {quiz.hasLimit ? `${quiz.limitMinutes} min` : '—'}
                    </TableCell>

                    <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'text.secondary' }}>
                      {new Date(quiz.createdAt).toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </TableCell>

                    <TableCell sx={{ p: 0, height: '1px' }} onClick={(e) => e.stopPropagation()}>

                      <Box sx={{ display: 'flex', height: '100%' }}>

                        {quiz.status === QuizStatus.CREATED ? (
                          <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                            <Tooltip title="Modificar cuestionario">
                              <IconButton size="small" onClick={() => navigate(PATHS.quiz.edit(quiz.id))} sx={{ borderRadius: 0, color: 'primary.main', width: '100%', height: '100%' }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ) : (
                          <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider' }} />
                        )}

                        <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                          <Tooltip title="Eliminar cuestionario">
                            <IconButton size="small" color="error" onClick={() => setIdQuizToDelete(quiz.id)} sx={{ borderRadius: 0, width: '100%', height: '100%' }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>

                      </Box>

                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>

          </TableContainer>

          {totalPages > 0 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

        </Box>

      </Paper>

      <ConfirmDialog
        open={!!idQuizToDelete}
        title="Eliminar cuestionario"
        message="¿Seguro que quieres eliminar este cuestionario? Se eliminarán sus preguntas, salas asociadas y las respuestas. Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={ async() => { await remove(idQuizToDelete!); refreshQuizzes(); setIdQuizToDelete(null) }}
        onClose={() => setIdQuizToDelete(null)}
      />

    </Container>
  )
}

export default ListQuizPage
