import * as z from "zod"
import { CompleteFeed, relatedFeedSchema } from "./index"

export const mediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  feedId: z.string(),
})

export interface CompleteMedia extends z.infer<typeof mediaSchema> {
  feed: CompleteFeed
}

/**
 * relatedMediaSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMediaSchema: z.ZodSchema<CompleteMedia> = z.lazy(() => mediaSchema.extend({
  feed: relatedFeedSchema,
}))
