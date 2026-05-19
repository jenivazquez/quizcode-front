import { useUpdateQuestion } from '../hooks/useUpdateQuestion'
import QuestionForm from '../components/QuestionForm'
import type { QuestionDetail } from '../types/question'

interface UpdateQuestionSectionProps {
  question: QuestionDetail
  onSuccess: () => void
  onCancel: () => void
}

const UpdateQuestionSection = ({ question, onSuccess, onCancel }: UpdateQuestionSectionProps) => {
  const { form, onSubmit, loading, error } = useUpdateQuestion(question, onSuccess)
  return <QuestionForm form={form} onSubmit={onSubmit} loading={loading} error={error} isUpdating={true} onCancel={onCancel} />
}

export default UpdateQuestionSection
