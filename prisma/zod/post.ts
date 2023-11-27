import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const postSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullish(),
  image: z.string().nullish(),
  userId: z.string(),
})

export interface CompletePost extends z.infer<typeof postSchema> {
  user: CompleteUser
}

/**
 * relatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() => postSchema.extend({
  user: relatedUserSchema,
}))
