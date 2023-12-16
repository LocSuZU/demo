import { getCommentById, getComments } from "@/lib/api/comments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  commentIdSchema,
  insertCommentParams,
  updateCommentParams,
} from "@/lib/db/schema/comments";
import { createComment, deleteComment, updateComment } from "@/lib/api/comments/mutations";

export const commentsRouter = router({
  getComments: publicProcedure.query(async () => {
    return getComments();
  }),
  getCommentById: publicProcedure.input(commentIdSchema).query(async ({ input }) => {
    return getCommentById(input.id);
  }),
  createComment: publicProcedure
    .input(insertCommentParams)
    .mutation(async ({ input }) => {
      return createComment(input);
    }),
  updateComment: publicProcedure
    .input(updateCommentParams)
    .mutation(async ({ input }) => {
      return updateComment(input.id, input);
    }),
  deleteComment: publicProcedure
    .input(commentIdSchema)
    .mutation(async ({ input }) => {
      return deleteComment(input.id);
    }),
});
