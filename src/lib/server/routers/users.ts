import { getUsers, getUsersFollowers } from "@/lib/api/users/queries";

import { publicProcedure, router } from "@/lib/server/trpc";
import {
  followedIdSchema,
  folloIdSchema,
  insertFolloParams
} from "@/lib/db/schema/follow";

import { createFollowUser, deleteFollowUser } from "@/lib/api/users/mutations";


export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),

  getUsersFollowers: publicProcedure.
  input(followedIdSchema).
  query(async ({input}) => {
    return getUsersFollowers(input.followedId);
  }),
  createFollowUser: publicProcedure
    .input(insertFolloParams)
    .mutation(async ({ input }) => {
      return createFollowUser(input);
    }),
  deleteFollowUser: publicProcedure
    .input(folloIdSchema)
    .mutation(async ({ input }) => {
      return deleteFollowUser(input.id);
    }),
});

