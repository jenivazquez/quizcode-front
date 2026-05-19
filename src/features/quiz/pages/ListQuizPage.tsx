import {
  Box, Container, Typography, Chip, IconButton, Tooltip, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useListQuiz } from '../hooks/useListQuiz'
import { useDeleteQuiz } from '../hooks/useDeleteQuiz'
import PageLoader from '../../../shared/components/PageLoader'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { PATHS } from '../../../app/routes/paths'

import { STATUS_LABEL, sxStatusChip } from '../constants/quizConstants'
import Pagination from '../components/Pagination'

const ListQuizPage = () => {

  const [idQuizToDelete, setIdQuizToDelete] = useState<string | null>(null)
  const [page, setPage] = useState(0)

  const { quizzes, loading: loadingQuizzes, error: listError, refreshQuizzes } = useListQuiz()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteQuiz()

  const navigate = useNavigate()

  const handleDelete = async () => {
    await remove(idQuizToDelete!)
    refreshQuizzes()
    setIdQuizToDelete(null)
  }

  const rowsPerPage = 10
  const totalPages = Math.ceil(quizzes.length / rowsPerPage)
  const visibleQuizzes = quizzes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  if (loadingQuizzes) return <PageLoader />
  if (listError) return <ErrorAlert message={listError} />

  return (

    <Container maxWidth="lg" sx={{ py: 6 }}>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{ px: 5, py: 7, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider', backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Typography variant="h5">Mis cuestionarios</Typography>
          <Typography variant="body2" color="text.secondary" mt={3}>Gestiona y organiza tus cuestionarios</Typography>
        </Box>

        <Box sx={{ px: 3, pt: 3, pb: 8 }}>

          <ErrorAlert message={deleteError} />

          <Box sx={{ mt: 4, mb: 1 }}>
            <Button startIcon={<AddIcon />} onClick={() => navigate(PATHS.create)}>
                  Nuevo cuestionario
            </Button>
          </Box>

          <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                
            <Table>

              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }} align="center">Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }} align="center">Duración</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }} align="center">Fecha de alta</TableCell>
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

                {visibleQuizzes.map((quiz) => {
                  return (
                    <TableRow key={quiz.id} hover onClick={() => navigate(PATHS.edit(quiz.id))} sx={{ cursor: 'pointer' }}>

                      <TableCell>{quiz.title}</TableCell>

                      <TableCell sx={{ maxWidth: 300, display: { xs: 'none', md: 'table-cell' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {quiz.description}
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        <Chip label={STATUS_LABEL[quiz.status]} variant="outlined" size="small" sx={sxStatusChip[quiz.status]}/>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'text.secondary' }}>
                        {quiz.hasLimit ? `${quiz.limitMinutes} min` : '—'}
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' }, color: 'text.secondary' }}>
                        {new Date(quiz.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </TableCell>

                      <TableCell sx={{ p: 0, height: '1px' }} onClick={(e) => e.stopPropagation()}>

                        <Box sx={{ display: 'flex', height: '100%' }}>

                          <Box sx={{ flex: 1, borderLeft: '1px solid', borderColor: 'divider', display: 'flex' }}>
                            <Tooltip title="Modificar cuestionario">
                              <IconButton size="small" onClick={() => navigate(PATHS.update(quiz.id))} sx={{ borderRadius: 0, color: 'primary.main', width: '100%', height: '100%' }}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>

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
                  )
                })}
              </TableBody>

            </Table>

          </TableContainer>

          {totalPages > 0 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

        </Box>

      </Paper>

      <ConfirmDialog
        open={!!idQuizToDelete}
        title="Eliminar cuestionario"
        message="¿Seguro que quieres eliminar este cuestionario? Se eliminarán sus preguntas y respuestas. Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={handleDelete}
        onClose={() => setIdQuizToDelete(null)}
      />

    </Container>
  )
}

export default ListQuizPage
