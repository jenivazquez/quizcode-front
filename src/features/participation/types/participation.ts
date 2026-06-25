export const PartStatus = {
  STARTED:  'STARTED',
  FINISHED: 'FINISHED',
} as const

export type PartStatus = typeof PartStatus[keyof typeof PartStatus]

export const ReviewStatus = {
  PENDING:        'PENDING',
  IA_REVIEWED:    'IA_REVIEWED',
  IA_FAILED:      'IA_FAILED',
  OWNER_REVIEWED: 'OWNER_REVIEWED',
} as const

export type ReviewStatus = typeof ReviewStatus[keyof typeof ReviewStatus]

interface Answer {
  questionId: string
  codeOptions: string[] | null
  writtenAnswer: string | null
  isCorrect: boolean
  score: number
  feedback: string | null
}

interface Participation {
  id: string
  roomId: string
  username: string
  password: string
  status: PartStatus
  reviewStatus: ReviewStatus
  startedAt: string
  finishedAt: string
  totalScore: number
  totalTime: number
  answers: Answer[]
}

export type PartCreate = Pick<Participation, 'username' | 'password'>
export type PartLogin = Pick<Participation, 'username' | 'password'>
export type PartDetail = Omit<Participation, 'password'>
export type PartRankingDetail = Pick<Participation, 'username' | 'totalScore' | 'totalTime' | 'reviewStatus'>

export type AnswerSubmit = Pick<Answer, 'questionId' | 'codeOptions' | 'writtenAnswer'>
export type AnswerDetail = Answer

export type AnswerReview = {
  questionId: string
  isCorrect: boolean
  score: number
  feedback: string | null
}