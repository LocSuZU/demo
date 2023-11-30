import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { postsRouter } from "./posts";
import { feedsRouter } from "./feeds";
import { mediasRouter } from "./medias";
import { usersRouter } from "./users";

export const appRouter = router({
  computers: computersRouter,
  posts: postsRouter,
  feeds: feedsRouter,
  medias: mediasRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
