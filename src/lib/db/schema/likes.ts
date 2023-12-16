import { likeSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getLikes } from "@/lib/api/likes/queries";


// Schema for likes - used to validate API requests
export const insertLikeSchema = likeSchema.omit({ id: true });

export const insertLikeParams = likeSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  id: true,
  userId: true
});

export const updateLikeSchema = likeSchema;

export const updateLikeParams = updateLikeSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  userId: true
});

export const likeIdSchema = updateLikeSchema.pick({ id: true });

// Types for likes - used to type API request params and within Components
export type Like = z.infer<typeof updateLikeSchema>;
export type NewLike = z.infer<typeof insertLikeSchema>;
export type NewLikeParams = z.infer<typeof insertLikeParams>;
export type UpdateLikeParams = z.infer<typeof updateLikeParams>;
export type LikeId = z.infer<typeof likeIdSchema>["id"];
    
// this type infers the return from getLikes() - meaning it will include any joins
export type CompleteLike = Awaited<ReturnType<typeof getLikes>>["likes"][number];

