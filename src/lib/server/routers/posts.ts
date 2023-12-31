import { getPostById, getPosts } from "@/lib/api/posts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  postIdSchema,
  insertPostParams,
  updatePostParams,
  insertLikeSchema,
  updateLikePostsSchema,
  getPostWithPagination
} from "@/lib/db/schema/posts";
import { insertCommentParams } from "@/lib/db/schema/comments";
import { createPost, deletePost, updatePost , likesPost , dislikePost ,  createCommentReply } from "@/lib/api/posts/mutations";

export const postsRouter = router({
  getPosts: publicProcedure.query(async () => {
    return getPosts();
  }),
  getPostById: publicProcedure.input(getPostWithPagination).query(async ({ input }) => {
    return getPostById(input.postId ,  input.page , input.limit);
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
      return dislikePost(input.postId, input);
    }),
  createCommentReply: publicProcedure
    .input(insertCommentParams)
    .mutation(async ({ input }) => {
      return createCommentReply(input , input.parentId!);
    }),
});
