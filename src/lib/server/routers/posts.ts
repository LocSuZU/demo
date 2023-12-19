import { getPostById, getPosts } from "@/lib/api/posts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  postIdSchema,
  insertPostParams,
  updatePostParams,
  insertLikeSchema,
  updateLikePostsSchema
} from "@/lib/db/schema/posts";
import { insertCommentParams } from "@/lib/db/schema/comments";
import { createPost, deletePost, updatePost , likesPost , dislikePost , createComment } from "@/lib/api/posts/mutations";

export const postsRouter = router({
  getPosts: publicProcedure.query(async () => {
    return getPosts();
  }),
  getPostById: publicProcedure.input(postIdSchema).query(async ({ input }) => {
    return getPostById(input.id);
  }),
  createPost: publicProcedure
    .input(insertPostParams)
    .mutation(async ({ input }) => {
      return createPost(input);
    }),
  updatePost: publicProcedure
    .input(updatePostParams)
    .mutation(async ({ input }) => {
      return updatePost(input.id, input);
    }),
  deletePost: publicProcedure
    .input(postIdSchema)
    .mutation(async ({ input }) => {
      return deletePost(input.id);
    }),
  likesPost: publicProcedure
    .input(insertLikeSchema)
    .mutation(async ({ input }) => {
      return likesPost(input);
    }),
  dislikedPost: publicProcedure
    .input(updateLikePostsSchema)
    .mutation(async ({ input }) => {
      return dislikePost(input.id, input);
    }),
  createComment: publicProcedure
    .input(insertCommentParams)
    .mutation(async ({ input }) => {
      console.log(555,input)
      return createComment(input);
    }),
});
