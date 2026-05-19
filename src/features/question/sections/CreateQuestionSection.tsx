import { useCreateQuestion } from '../hooks/useCreateQuestion'
import QuestionForm from '../components/QuestionForm'

interface CreateQuestionSectionProps {
  nextOrder: number
  onSuccess: () => void
  onCancel: () => void
}

const CreateQuestionSection = ({ nextOrder, onSuccess, onCancel }: CreateQuestionSectionProps) => {
  const { form, onSubmit, loading, error } = useCreateQuestion(nextOrder, onSuccess)
  return <QuestionForm form={form} onSubmit={onSubmit} loading={loading} error={error} isUpdating={false} onCancel={onCancel} />
}

export default CreateQuestionSection
