import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { postsRouter } from "./posts";
import { feedsRouter } from "./feeds";
import { mediasRouter } from "./medias";
import { usersRouter } from "./users";
import { likesRouter } from "./likes";
import { commentsRouter } from "./comments";
import { sharesRouter } from "./shares";


export const appRouter = router({
  computers: computersRouter,
  posts: postsRouter,
  feeds: feedsRouter,
  medias: mediasRouter,
  users: usersRouter,
  likes: likesRouter,
  comments: commentsRouter,
  shares: sharesRouter,
});

export type AppRouter = typeof appRouter;
