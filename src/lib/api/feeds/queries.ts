import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type FeedId, feedIdSchema } from "@/lib/db/schema/feeds";

export const getFeeds = async () => {
  const { session } = await getUserAuth();
  const f = await db.feed.findMany({ where: {userId: session?.user.id!}, include: { medias: true }});
  return { feeds: f };
};

export const getFeedById = async (id: FeedId) => {
  const { session } = await getUserAuth();
  const { id: feedId } = feedIdSchema.parse({ id });
  const f = await db.feed.findFirst({
    where: { id: feedId, userId: session?.user.id!}});
  return { feeds: f };
};

