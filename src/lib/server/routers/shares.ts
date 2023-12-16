import { getShareById, getShares } from "@/lib/api/shares/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  shareIdSchema,
  insertShareParams,
  updateShareParams,
} from "@/lib/db/schema/shares";
import { createShare, deleteShare, updateShare } from "@/lib/api/shares/mutations";

export const sharesRouter = router({
  getShares: publicProcedure.query(async () => {
    return getShares();
  }),
  getShareById: publicProcedure.input(shareIdSchema).query(async ({ input }) => {
    return getShareById(input.id);
  }),
  createShare: publicProcedure
    .input(insertShareParams)
    .mutation(async ({ input }) => {
      return createShare(input);
    }),
  updateShare: publicProcedure
    .input(updateShareParams)
    .mutation(async ({ input }) => {
      return updateShare(input.id, input);
    }),
  deleteShare: publicProcedure
    .input(shareIdSchema)
    .mutation(async ({ input }) => {
      return deleteShare(input.id);
    }),
});
