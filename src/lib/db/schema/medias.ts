import { mediaSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getMedias } from "@/lib/api/medias/queries";


// Schema for medias - used to validate API requests
export const insertMediaSchema = mediaSchema.omit({ id: true });

export const insertMediaParams = mediaSchema.extend({
  feedId: z.coerce.string()
}).omit({ 
  id: true
});



export const updateMediaSchema = mediaSchema;

export const updateMediaParams = updateMediaSchema.extend({
  feedId: z.coerce.string()
})

export const mediaIdSchema = updateMediaSchema.pick({ id: true });

// Types for medias - used to type API request params and within Components
export type Media = z.infer<typeof updateMediaSchema>;
export type NewMedia = z.infer<typeof insertMediaSchema>;
export type NewMediaParams = z.infer<typeof insertMediaParams>;
export type UpdateMediaParams = z.infer<typeof updateMediaParams>;
export type MediaId = z.infer<typeof mediaIdSchema>["id"];
export type FeedId = z.infer<typeof insertMediaParams>["feedId"];
    
// this type infers the return from getMedias() - meaning it will include any joins
export type CompleteMedia = Awaited<ReturnType<typeof getMedias>>["medias"][number];

