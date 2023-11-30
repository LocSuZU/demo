import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const followSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  followerId: z.string(),
  followedId: z.string(),
})

export interface CompleteFollow extends z.infer<typeof followSchema> {
  follower: CompleteUser
  followed: CompleteUser
}

/**
 * relatedFollowSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFollowSchema: z.ZodSchema<CompleteFollow> = z.lazy(() => followSchema.extend({
  follower: relatedUserSchema,
  followed: relatedUserSchema,
}))
