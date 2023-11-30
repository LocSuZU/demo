import {  getUsers, checkUserFollowUser  } from "@/lib/api/users/queries";

import { publicProcedure, router } from "@/lib/server/trpc";
import {
  folloIdSchema,
  insertFolloParams
} from "@/lib/db/schema/follow";
import { createFollowUser ,deleteFollowUser } from "@/lib/api/users/mutations";
import { z } from "zod";

const CheckUserFollowUserInput = z.object({
  followerId: z.string(),
  followedId: z.string(),
});

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  createFollowUser: publicProcedure
  .input(insertFolloParams)
  .mutation(async ({ input }) => {
    return createFollowUser(input); 
  }),
  deleteFollowUser: publicProcedure
  .input(folloIdSchema)
  .mutation(async ({ input }) => {
    console.log(333, input)
    return deleteFollowUser(input.id); 
  }),
  checkUserFollowUser: publicProcedure
  .input(CheckUserFollowUserInput)
  .query(async ({ input }) => {
    return checkUserFollowUser(input.followedId, input.followerId); 
  }),
});

