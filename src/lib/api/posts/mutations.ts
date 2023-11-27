import { db } from "@/lib/db/index";
import { 
  PostId, 
  NewPostParams,
  UpdatePostParams, 
  updatePostSchema,
  insertPostSchema, 
  postIdSchema 
} from "@/lib/db/schema/posts";
import { getUserAuth } from "@/lib/auth/utils";




export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
  try {
    const p = await db.post.create({ data: newPost });
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updatePost = async (id: PostId, post: UpdatePostParams) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const newPost = updatePostSchema.parse({ ...post, userId: session?.user.id! });
  try {
    const p = await db.post.update({ where: { id: postId }, data: newPost})
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deletePost = async (id: PostId) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });

  try {
    const p = await db.post.delete({ where: { id: postId }})
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

