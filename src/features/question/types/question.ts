export const QuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  EDIT_CODE: 'EDIT_CODE',
} as const

export type QuestionType = typeof QuestionType[keyof typeof QuestionType]

interface Option {
  code: string
  value: string
  isValid?: boolean
}

interface Question {
  id: string
  quizId: string
  statement: string
  baseCode: string | null
  type: QuestionType
  order: number
  score: number
  options: Option[] | null
}

export type QuestionCreate = Pick<Question, 'statement' | 'baseCode' | 'type' | 'order'| 'score' | 'options'>
export type QuestionUpdate = Pick<Question, 'statement' | 'baseCode' | 'type' | 'order'| 'score' | 'options'>
export type QuestionDetail = Question
