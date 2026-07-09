import { z } from 'zod'

export const JoinRoomSchema = z.object({

  code: z.string().trim()
    .min(1, { message: 'El código de la sala es obligatorio' }),

})

export type JoinRoomFormData = z.infer<typeof JoinRoomSchema>
