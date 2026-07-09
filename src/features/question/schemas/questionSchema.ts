import { z } from 'zod'
import { QuestionType } from '../types/question'
import { OPTION_CODES } from '../constants/questionConstants'

const OptionSchema = z.object({
  value: z.string()
    .min(1, { message: 'La opción no puede estar vacía' })
    .max(200, { message: 'Máximo 200 caracteres' }),
  isValid: z.boolean(),
})

export const QuestionSchema = z.object({

  type: z.enum(Object.values(QuestionType)),

  score: z.number(
    { error: 'La puntuación es obligatoria' })
    .int({ message: 'Debe ser un número entero' })
    .min(1, { message: 'Debe ser mayor que 0' }),

  statement: z.string().trim()
    .min(1, { message: 'El enunciado es obligatorio' })
    .max(500, { message: 'El enunciado no puede superar los 500 caracteres' }),

  baseCode: z.string().nullable(),

  options: z.array(OptionSchema)
    .max(OPTION_CODES.length, { message: `Solo se pueden añadir ${OPTION_CODES.length} opciones` }),

})
  .refine(
    data => !(data.type === QuestionType.EDIT_CODE && !data.baseCode?.trim()),
    { message: 'El código base es obligatorio', path: ['baseCode'] }
  )
  .refine(
    data => !(data.type === QuestionType.SINGLE_CHOICE && data.options.length < 2),
    { message: 'Se necesitan al menos 2 opciones', path: ['options'] }
  )
  .refine(
    data => !(data.type === QuestionType.MULTIPLE_CHOICE && data.options.length < 3),
    { message: 'Se necesitan al menos 3 opciones', path: ['options'] }
  )
  .refine(
    data => !(data.type === QuestionType.SINGLE_CHOICE && data.options.filter(o => o.isValid).length !== 1),
    { message: 'Una de las opciones debe estar marcada como correcta', path: ['options'] }
  )
  .refine(
    data => !(data.type === QuestionType.MULTIPLE_CHOICE && !data.options.some(o => o.isValid)),
    { message: 'Al menos una de las opciones debe estar marcada como correcta', path: ['options'] }
  )

export type QuestionFormData = z.infer<typeof QuestionSchema>
