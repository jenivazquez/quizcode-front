import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email({ message: 'El formato del email no es válido' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
})

export type LoginFormData = z.infer<typeof LoginSchema>;
