import { z } from 'zod'

export const LoginPartSchema = z.object({

  username: z.string().trim()
    .min(1, { message: 'El nombre de usuario es obligatorio' }),

  password: z.string()
    .min(1, { message: 'La contraseña es obligatoria' }),

})

export type LoginPartFormData = z.infer<typeof LoginPartSchema>
