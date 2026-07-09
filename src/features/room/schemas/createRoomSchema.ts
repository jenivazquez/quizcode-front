import { z } from 'zod'

export const CreateRoomSchema = z.object({

  quizId: z.string()
    .min(1, { message: 'El cuestionario es obligatorio' }),

  name: z.string().trim()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(100, { message: 'El nombre no puede superar los 100 caracteres' }),

  description: z.string().trim()
    .min(1, { message: 'La descripción es obligatoria' })
    .max(500, { message: 'La descripción no puede superar los 500 caracteres' }),

})

export type CreateRoomFormData = z.infer<typeof CreateRoomSchema>

