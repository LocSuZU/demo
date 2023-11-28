import { getFeedById, getFeeds } from "@/lib/api/feeds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  feedIdSchema,
  insertFeedParams,
  updateFeedParams,
} from "@/lib/db/schema/feeds";
import { createFeed, deleteFeed, updateFeed } from "@/lib/api/feeds/mutations";

export const feedsRouter = router({
  getFeeds: publicProcedure.query(async () => {
    return getFeeds();
  }),
  getFeedById: publicProcedure.input(feedIdSchema).query(async ({ input }) => {
    return getFeedById(input.id);
  }),
  createFeed: publicProcedure
    .input(insertFeedParams)
    .mutation(async ({ input }) => {
      return createFeed(input);
    }),
  updateFeed: publicProcedure
    .input(updateFeedParams)
    .mutation(async ({ input }) => {
      return updateFeed(input.id, input);
    }),
  deleteFeed: publicProcedure
    .input(feedIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeed(input.id);
    }),
});
