import { z } from 'zod'
import { CreateRoomSchema } from './createRoomSchema'

export const UpdateRoomSchema = CreateRoomSchema.omit({ quizId: true })

export type UpdateRoomFormData = z.infer<typeof UpdateRoomSchema>