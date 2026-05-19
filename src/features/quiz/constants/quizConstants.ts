import type { QuizStatus } from '../types/quiz'

export const STATUS_LABEL: Record<QuizStatus, string> = {
  CREATED: 'Borrador',
  PUBLISHED: 'Publicado',
  LOCKED: 'Bloqueado',
}

export const sxStatusChip: Record<QuizStatus, object> = {
  PUBLISHED: { bgcolor: 'success.extra', color: 'success.dark', borderColor: 'success.dark', minWidth: 80 },
  LOCKED:    { bgcolor: 'error.extra',   color: 'error.main',   borderColor: 'error.main',   minWidth: 80 },
  CREATED:   { bgcolor: 'primary.extra', color: 'primary.dark', borderColor: 'primary.dark', minWidth: 80 },
}
