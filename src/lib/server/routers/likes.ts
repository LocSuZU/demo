import { getLikeById, getLikes } from "@/lib/api/likes/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  likeIdSchema,
  insertLikeParams,
  updateLikeParams,
} from "@/lib/db/schema/likes";
import { createLike, deleteLike, updateLike } from "@/lib/api/likes/mutations";

export const likesRouter = router({
  getLikes: publicProcedure.query(async () => {
    return getLikes();
  }),
  getLikeById: publicProcedure.input(likeIdSchema).query(async ({ input }) => {
    return getLikeById(input.id);
  }),
  createLike: publicProcedure
    .input(insertLikeParams)
    .mutation(async ({ input }) => {
      return createLike(input);
    }),
  updateLike: publicProcedure
    .input(updateLikeParams)
    .mutation(async ({ input }) => {
      return updateLike(input.id, input);
    }),
  deleteLike: publicProcedure
    .input(likeIdSchema)
    .mutation(async ({ input }) => {
      return deleteLike(input.id);
    }),
});
