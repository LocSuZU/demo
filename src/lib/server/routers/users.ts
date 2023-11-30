import {  getUsers } from "@/lib/api/users/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
// import {createFollow} from "@/lib/api/users/mutations";

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  // createFollow : publicProcedure.mutation(async () => {
  //   return createFollow(); 
  // }),
});