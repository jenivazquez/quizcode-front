import { z } from 'zod'
import { NAME_PATTERN, LETTER_PATTERN, NUMBER_PATTERN } from '../constants/userConstants'

export const CreateUserSchema = z.object({

  email: z.email({ message: 'El formato del email no es válido' }),

  password: z.string()
    .min(1, { message: 'La contraseña es obligatoria' })
    .min(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
    .regex(LETTER_PATTERN, { message: 'La contraseña debe contener al menos una letra' })
    .regex(NUMBER_PATTERN, { message: 'La contraseña debe contener al menos un número' }),

  repeatPassword: z.string(),

  name: z.string().trim()
    .min(1, { message: 'El nombre es obligatorio' })
    .regex(NAME_PATTERN, { message: 'El nombre contiene caracteres inválidos' }),

  surname1: z.string().trim()
    .min(1, { message: 'El primer apellido es obligatorio' })
    .regex(NAME_PATTERN, { message: 'El primer apellido contiene caracteres inválidos' }),

  surname2: z.string().trim()
    .min(1, { message: 'El segundo apellido es obligatorio' })
    .regex(NAME_PATTERN, { message: 'El segundo apellido contiene caracteres inválidos' }),
    
})
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword'],
  })

export type CreateUserFormData = z.infer<typeof CreateUserSchema>;
