import type { QuestionType } from '../types/question'

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  SINGLE_CHOICE: 'Opción única',
  MULTIPLE_CHOICE: 'Opción múltiple',
  EDIT_CODE: 'Modificar código',
}

export const OPTION_CODES = ['A', 'B', 'C', 'D', 'E', 'F'] as const
