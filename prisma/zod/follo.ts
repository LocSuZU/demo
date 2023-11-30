import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const folloSchema = z.object({
  id: z.string(),
  followerId: z.string(),
  followedId: z.string(),
})

export interface CompleteFollo extends z.infer<typeof folloSchema> {
  follower: CompleteUser
  followed: CompleteUser
}

/**
 * relatedFolloSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFolloSchema: z.ZodSchema<CompleteFollo> = z.lazy(() => folloSchema.extend({
  follower: relatedUserSchema,
  followed: relatedUserSchema,
}))
