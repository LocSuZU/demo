import * as z from "zod"
import { CompletePost, relatedPostSchema, CompleteUser, relatedUserSchema } from "./index"

export const commentSchema = z.object({
  id: z.string(),
  postId: z.number().int(),
  content: z.string().nullish(),
  userId: z.string(),
  parentId: z.string().nullish(),
})

export interface CompleteComment extends z.infer<typeof commentSchema> {
  post: CompletePost
  user: CompleteUser
}

/**
 * relatedCommentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommentSchema: z.ZodSchema<CompleteComment> = z.lazy(() => commentSchema.extend({
  post: relatedPostSchema,
  user: relatedUserSchema,
}))
