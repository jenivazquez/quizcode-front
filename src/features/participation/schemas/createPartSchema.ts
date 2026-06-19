import { z } from 'zod'
import { NAME_PATTERN, LETTER_PATTERN, NUMBER_PATTERN } from '../constants/participationConstants'

export const CreatePartSchema = z.object({

  username: z.string()
    .min(1, { message: 'El nombre de usuario es obligatorio' })
    .max(20, { message: 'El nombre de usuario no puede superar los 20 caracteres' })
    .regex(NAME_PATTERN, { message: 'El nombre contiene caracteres inválidos' }),

  password: z.string()
    .min(1, { message: 'La contraseña es obligatoria' })
    .min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
    .regex(LETTER_PATTERN, { message: 'La contraseña debe contener al menos una letra' })
    .regex(NUMBER_PATTERN, { message: 'La contraseña debe contener al menos un número' }),

  repeatPassword: z.string(),

})
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword'],
  })

export type CreatePartFormData = z.infer<typeof CreatePartSchema>
