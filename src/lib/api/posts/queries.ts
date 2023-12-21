import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema } from "@/lib/db/schema/posts";


export const getPosts = async () => {
  const p = await db.post.findMany({include: { user: true , likes : true, Share : true , Comment : true } });
  return { posts: p };
};

 

export const getPostById = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const p = await db.post.findFirst({
    where: { id: postId},
    include : { user: true , likes : true, Share : true , Comment : true}
  });

  return { posts: p};
};



