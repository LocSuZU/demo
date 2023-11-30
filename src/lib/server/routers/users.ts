import {  getUsers } from "@/lib/api/users/queries";
import { publicProcedure, router } from "@/lib/server/trpc";

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
});