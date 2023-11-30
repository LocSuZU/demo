import {  getUsers  } from "@/lib/api/users/queries";

import { publicProcedure, router } from "@/lib/server/trpc";
import {
  NewFolloParams,
  insertFolloParams
} from "@/lib/db/schema/follow";
import { createFollowUser } from "@/lib/api/users/mutations";



export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  createFollowUser: publicProcedure
  .input(insertFolloParams)
  .mutation(async ({ input }) => {
    return createFollowUser(input); 
  }),
});

