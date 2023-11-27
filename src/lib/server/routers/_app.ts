import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { postsRouter } from "./posts";

export const appRouter = router({
  computers: computersRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
