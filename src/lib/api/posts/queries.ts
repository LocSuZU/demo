import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema } from "@/lib/db/schema/posts";


export const getPosts = async () => {
  const { session } = await getUserAuth();
  const p = await db.post.findMany({ where: {userId: session?.user.id!}});
  return { posts: p };
};

export const getPostById = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const p = await db.post.findFirst({
    where: { id: postId, userId: session?.user.id!}});
  return { posts: p };
};



