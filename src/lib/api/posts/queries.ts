import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PostId, postIdSchema } from "@/lib/db/schema/posts";

type CommentWithReplies = {
  id: string;
  postId: number;
  content: string | null;
  userId: string;
  parentId: string | null;
  replies?: CommentWithReplies[];
};

export const getPosts = async () => {
  const p = await db.post.findMany({include: { user: true , likes : true, Share : true , Comment : true } });
  return { posts: p };
};

async function fetchComments(postId: number, parentId: string | null = null , page: number | 1 , limit: number | 10): Promise<CommentWithReplies[]> {
  const skip = (page - 1) * limit;
  const take = limit;

  const comments = await db.comment.findMany({
    where: { postId :  postId ,  parentId: parentId },
    include: { user: true },
    skip: skip,
    take: take,
  });

  for (const comment of comments) {
    if(comment.parentId === parentId) {
      (comment as CommentWithReplies).replies = await fetchComments(postId,  comment.id , page , limit);
    }
  }

  return comments as CommentWithReplies[];
}

export const getPostById = async (id: PostId , page: number | 1 , limit: number | 10 ) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const p = await db.post.findFirst({
    where: { id: postId},
    include : { user: true , likes : true, Share : true  }
  });
  // p.comments = await fetchComments(postId , null, page , limit);
  return { posts: p };
};

