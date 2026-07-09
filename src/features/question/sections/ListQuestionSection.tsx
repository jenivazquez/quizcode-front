import { useState, useEffect } from 'react'
import { Box, Button, Typography, Paper, IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useListQuestions } from '../hooks/useListQuestions'
import { useDeleteQuestion } from '../hooks/useDeleteQuestion'
import CreateQuestionSection from './CreateQuestionSection'
import UpdateQuestionSection from './UpdateQuestionSection'
import ErrorAlert from '../../../shared/components/ErrorAlert'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import CodeViewer from '../../../shared/components/CodeViewer'
import { QUESTION_TYPE_LABELS } from '../constants/questionConstants'
import type { QuestionDetail } from '../types/question'
import PageLoader from '../../../shared/components/PageLoader'

interface ListQuestionSectionProps {
  isEditable: boolean
}

const ListQuestionSection = ({ isEditable }: ListQuestionSectionProps) => {

  const { questions, loading, error, refreshQuestions } = useListQuestions()
  const { remove, loading: loadingDelete, error: deleteError } = useDeleteQuestion()
  const [questionToEdit, setQuestionToEdit] = useState<QuestionDetail | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [idQuestionToDelete, setIdQuestionToDelete] = useState<string | null>(null)

  const nextOrder = questions.length === 0 ? 100 : Math.max(...questions.map(q => q.order)) + 100
  const isBusy = showCreateForm || questionToEdit !== null

  useEffect(() => {
    if (showCreateForm) requestAnimationFrame(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    )
  }, [showCreateForm])

  if (loading) return <PageLoader />
  if (error) return <ErrorAlert message={error} />

  return (
    <>
      <ErrorAlert message={deleteError} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>

        {questions.map((question) =>

          (question.id === questionToEdit?.id) ? (

            <UpdateQuestionSection
              question={questionToEdit}
              onSuccess={() => { setQuestionToEdit(null); refreshQuestions() }}
              onCancel={() => setQuestionToEdit(null)} />

          ) : (

            <Paper key={question.id} sx={{ borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch' }}>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, width: { xs: '100%', md: 150 }, flexShrink: 0, bgcolor: 'grey.50', overflow: 'hidden' }}>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: { xs: 1, md: 0 }, borderBottom: '1px solid', borderRight: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary" textAlign="center" lineHeight={1.3}>
                    {QUESTION_TYPE_LABELS[question.type]}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: { xs: 1, md: 0 }, borderBottom: { xs: '1px solid #dadada', md: 0 }, borderRight: { xs: 0, md: '1px solid #dadada' }}}>
                  <Typography variant="caption" fontWeight={600} color="primary.main" textAlign="center">
                    {question.score} {question.score === 1 ? 'punto' : 'puntos'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1, px: 2.5, py: 2 }}>

                <Typography variant="body1" fontWeight={600}>
                  {question.statement}
                </Typography>

                {question.baseCode && (
                  <Box sx= {{pt: 1, pl: 1}}>
                    <CodeViewer value={question.baseCode} />
                  </Box>
                )}

                {!!question.options?.length && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                    {question.options.map(option => (
                      <Typography key={option.code} variant="body2" fontWeight={option.isValid ? 600 : 400} color={option.isValid ? 'success.dark' : 'text.secondary'} >
                        {option.code}. {option.value}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>

              {isEditable && (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, flexShrink: 0 }}>
                  <Box sx={{ flex: 1, display: 'flex', borderTop: { xs: '1px solid #dadada', md: 0 }, borderLeft: { xs: 0, md: '1px solid #dadada' }}}>
                    <Tooltip title="Modificar">
                      <IconButton onClick={() => setQuestionToEdit(question)} disabled={isBusy} sx={{ flex: 1, borderRadius: 0, color: 'primary.main', px: 2 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', borderTop: '1px solid', borderLeft: '1px solid', borderColor: 'divider' }}>
                    <Tooltip title="Eliminar">
                      <IconButton color="error" onClick={() => setIdQuestionToDelete(question.id)} disabled={isBusy} sx={{ flex: 1, borderRadius: 0, px: 2 }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}

            </Paper>
          )
        )}
      </Box>

      {isEditable && !isBusy && (
        <Box>
          <Button startIcon={<AddIcon />} onClick={() => setShowCreateForm(true)}>
            Añadir pregunta
          </Button>
        </Box>
      )}

      {showCreateForm && (
        <CreateQuestionSection
          nextOrder={nextOrder}
          onSuccess={() => { setShowCreateForm(false); refreshQuestions() }}
          onCancel={() => setShowCreateForm(false)} />
      )}

      <ConfirmDialog
        open={!!idQuestionToDelete}
        title="Eliminar pregunta"
        message="¿Seguro que quieres eliminar esta pregunta? Esta acción no se puede deshacer."
        loading={loadingDelete}
        onConfirm={async () => { await remove(idQuestionToDelete!); refreshQuestions(); setIdQuestionToDelete(null) }}
        onClose={() => setIdQuestionToDelete(null)}
      />
    </>
  )
}

export default ListQuestionSection
