import * as z from "zod"
import { CompletePost, relatedPostSchema, CompleteUser, relatedUserSchema } from "./index"

export const likeSchema = z.object({
  id: z.string(),
  postId: z.number().int(),
  userId: z.string(),
})

export interface CompleteLike extends z.infer<typeof likeSchema> {
  post: CompletePost
  user: CompleteUser
}

/**
 * relatedLikeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedLikeSchema: z.ZodSchema<CompleteLike> = z.lazy(() => likeSchema.extend({
  post: relatedPostSchema,
  user: relatedUserSchema,
}))
