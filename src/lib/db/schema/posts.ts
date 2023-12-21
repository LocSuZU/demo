import { postSchema } from "@/zodAutoGenSchemas";
import { likeSchema } from "@/zodAutoGenSchemas";
import { commentSchema } from "@/zodAutoGenSchemas";
import { userSchema } from "@/zodAutoGenSchemas";
import {shareSchema} from "@/zodAutoGenSchemas";

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

export const insertLikeSchema = likeSchema.omit({ id: true });
export const insertLikePostsSchema = likeSchema.extend({}).omit({ 
  id: true,
  userId: true,
});

export const updateLikeSchema = likeSchema;
export const updateLikePostsSchema = updateLikeSchema.extend({}).omit({ 
});
export const likeIdSchema = updateLikeSchema.pick({ id: true });


// Types for posts - used to type API request params and within Components
export type Post = z.infer<typeof updatePostSchema>;
export type NewPost = z.infer<typeof insertPostSchema>;
export type NewPostParams = z.infer<typeof insertPostParams>;
export type UpdatePostParams = z.infer<typeof updatePostParams>;
export type PostId = z.infer<typeof postIdSchema>["id"];
export type Like = z.infer<typeof updateLikeSchema>;
export type NewLikeParams = z.infer<typeof insertLikePostsSchema>;
export type UpdateLikeParams = z.infer<typeof updateLikeSchema>;
export type LikeId = z.infer<typeof likeIdSchema>["id"];
    
// this type infers the return from getPosts() - meaning it will include any joins
export type CompletePost = Awaited<ReturnType<typeof getPosts>>["posts"][number];


