import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type CommentId, commentIdSchema } from "@/lib/db/schema/comments";

type CommentWithReplies = {
  id: string;
  postId: number;
  content: string | null;
  userId: string;
  parentId: string | null;
  replies?: CommentWithReplies[];
};


export const getComments = async () => {
  const { session } = await getUserAuth();
  const c = await db.comment.findMany({ where: {userId: session?.user.id!}, include: { post: true}});
  return { comments: c };
};

export const getCommentById = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const c = await db.comment.findFirst({
    where: { id: commentId, userId: session?.user.id!},
    include: { post: true }
  });
  return { comments: c };
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

export const getCommentsByPostId = async (postId: number , parentId: string | null = null , page: number | 1 , limit: number | 10) => {
  const comments = await fetchComments(postId , null, page , limit);
  return comments
}
