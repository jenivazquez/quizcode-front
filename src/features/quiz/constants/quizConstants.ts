import type { QuizStatus } from '../types/quiz'

export const STATUS_LABEL: Record<QuizStatus, string> = {
  CREATED:   'Borrador',
  PUBLISHED: 'Publicado',
  LOCKED:    'Publicado',
}

export const sxStatusChip: Record<QuizStatus, object> = {
  PUBLISHED: { color: 'success.dark', borderColor: 'success.dark', minWidth: 90, fontSize: '0.875rem' },
  LOCKED:    { color: 'success.dark', borderColor: 'success.dark', minWidth: 90, fontSize: '0.875rem' },
  CREATED:   { color: 'primary.dark', borderColor: 'primary.dark', minWidth: 90, fontSize: '0.875rem' },
}
