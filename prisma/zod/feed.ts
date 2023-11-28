import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteMedia, relatedMediaSchema } from "./index"

export const feedSchema = z.object({
  id: z.string(),
  content: z.string().nullish(),
  userId: z.string(),
})

export interface CompleteFeed extends z.infer<typeof feedSchema> {
  user: CompleteUser
  medias: CompleteMedia[]
}

/**
 * relatedFeedSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFeedSchema: z.ZodSchema<CompleteFeed> = z.lazy(() => feedSchema.extend({
  user: relatedUserSchema,
  medias: relatedMediaSchema.array(),
}))
