import { db } from "@/lib/db/index";
import { 
  FeedId, 
  NewFeedParams,
  UpdateFeedParams, 
  updateFeedSchema,
  insertFeedSchema, 
  feedIdSchema 
} from "@/lib/db/schema/feeds";
import { getUserAuth } from "@/lib/auth/utils";

export const createFeed = async (feed: NewFeedParams) => {
 
  const { session } = await getUserAuth();
  const newFeed = insertFeedSchema.parse({ ...feed, userId: session?.user.id! });
  try {
    const f = await db.feed.create({ data: newFeed });
    return { feed: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateFeed = async (id: FeedId, feed: UpdateFeedParams) => {
  const { session } = await getUserAuth();
  const { id: feedId } = feedIdSchema.parse({ id });
  const newFeed = updateFeedSchema.parse({ ...feed, userId: session?.user.id! });
  try {
    const f = await db.feed.update({ where: { id: feedId }, data: newFeed})
    return { feed: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteFeed = async (id: FeedId) => {
  const { session } = await getUserAuth();
  const { id: feedId } = feedIdSchema.parse({ id });
  try {
    const f = await db.feed.delete({ where: { id: feedId}})
    return { feed: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

