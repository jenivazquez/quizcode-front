import { z } from 'zod'

export const QuizSchema = z.object({

  title: z.string()
    .min(1, { message: 'El título es obligatorio' })
    .max(50, { message: 'El título no puede superar los 50 caracteres' }),

  description: z.string()
    .min(1, { message: 'La descripción es obligatoria' })
    .max(500, { message: 'La descripción no puede superar los 500 caracteres' }),

  hasLimit: z.boolean(),

  limitMinutes: z.union([
    z.nan().transform(() => null),
    z.number()
      .int({ message: 'El tiempo debe ser un número entero' })
      .min(1, { message: 'El tiempo mínimo es 1 minuto' }),
  ]).nullish(),

})
  .refine(data => !(data.hasLimit && data.limitMinutes == null), { 
    message: 'El tiempo límite es obligatorio', 
    path: ['limitMinutes'] 
  })

export type QuizFormData = z.infer<typeof QuizSchema>
