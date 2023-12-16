import * as z from "zod"
import { CompletePost, relatedPostSchema, CompleteUser, relatedUserSchema } from "./index"

export const shareSchema = z.object({
  id: z.string(),
  postId: z.number().int(),
  userId: z.string(),
})

export interface CompleteShare extends z.infer<typeof shareSchema> {
  post: CompletePost
  user: CompleteUser
}

/**
 * relatedShareSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedShareSchema: z.ZodSchema<CompleteShare> = z.lazy(() => shareSchema.extend({
  post: relatedPostSchema,
  user: relatedUserSchema,
}))
