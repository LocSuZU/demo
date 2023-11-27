import { postSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getPosts } from "@/lib/api/posts/queries";


// Schema for posts - used to validate API requests
export const insertPostSchema = postSchema.omit({ id: true });

export const insertPostParams = postSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updatePostSchema = postSchema;

export const updatePostParams = updatePostSchema.extend({}).omit({ 
  userId: true
});

export const postIdSchema = updatePostSchema.pick({ id: true });

// Types for posts - used to type API request params and within Components
export type Post = z.infer<typeof updatePostSchema>;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdSchema>["id"];
    
// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<ReturnType<typeof getPosts>>["posts"][number];

