import { getMediaById, getMedias } from "@/lib/api/medias/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  mediaIdSchema,
  insertMediaParams,
  updateMediaParams,
} from "@/lib/db/schema/medias";
import { createMedia, deleteMedia, updateMedia } from "@/lib/api/medias/mutations";

export const mediasRouter = router({
  getMedias: publicProcedure.query(async () => {
    return getMedias();
  }),
  getMediaById: publicProcedure.input(mediaIdSchema).query(async ({ input }) => {
    return getMediaById(input.id);
  }),
  createMedia: publicProcedure
    .input(insertMediaParams)
    .mutation(async ({ input }) => {
      return createMedia(input);
    }),
  updateMedia: publicProcedure
    .input(updateMediaParams)
    .mutation(async ({ input }) => {
      return updateMedia(input.id, input);
    }),
  deleteMedia: publicProcedure
    .input(mediaIdSchema)
    .mutation(async ({ input }) => {
      return deleteMedia(input.id);
    }),
});
