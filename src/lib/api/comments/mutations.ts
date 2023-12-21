import { db } from "@/lib/db/index";
import { 
  CommentId, 
  NewCommentParams,
  UpdateCommentParams, 
  updateCommentSchema,
  insertCommentSchema, 
  commentIdSchema 
} from "@/lib/db/schema/comments";
import { getUserAuth } from "@/lib/auth/utils";
import { pusherServer } from '@/lib/pusher';

export const createComment = async (comment: NewCommentParams) => {
  const { session } = await getUserAuth();
  const newComment = insertCommentSchema.parse({ ...comment, userId: session?.user.id! });
  try {
    const c = await db.comment.create({ data: newComment });
    const p = await db.post.findUnique({ where: { id:  c.postId  } , 
        include: { user: true } 
      });
    await pusherServer.trigger(p?.id.toString(), "client:comment", c);
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateComment = async (id: CommentId, comment: UpdateCommentParams) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  const newComment = updateCommentSchema.parse({ ...comment, userId: session?.user.id! });
  try {
    const c = await db.comment.update({ where: { id: commentId, userId: session?.user.id! }, data: newComment})
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteComment = async (id: CommentId) => {
  const { session } = await getUserAuth();
  const { id: commentId } = commentIdSchema.parse({ id });
  try {
    const c = await db.comment.delete({ where: { id: commentId, userId: session?.user.id! }})
    return { comment: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

