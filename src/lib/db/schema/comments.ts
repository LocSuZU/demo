import { commentSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getComments } from "@/lib/api/comments/queries";


// Schema for comments - used to validate API requests
export const insertCommentSchema = commentSchema.omit({ id: true });

export const insertCommentParams = commentSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  id: true,
  userId: true
});

export const updateCommentSchema = commentSchema;

export const updateCommentParams = updateCommentSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  userId: true
});

export const commentIdSchema = updateCommentSchema.pick({ id: true });

// Types for comments - used to type API request params and within Components
export type Comment = z.infer<typeof updateCommentSchema>;
export type NewComment = z.infer<typeof insertCommentSchema>;
export type NewCommentParams = z.infer<typeof insertCommentParams>;
export type UpdateCommentParams = z.infer<typeof updateCommentParams>;
export type CommentId = z.infer<typeof commentIdSchema>["id"];
    
// this type infers the return from getComments() - meaning it will include any joins
export type CompleteComment = Awaited<ReturnType<typeof getComments>>["comments"][number];

