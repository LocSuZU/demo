import { db } from "@/lib/db/index";
import { 
  LikeId, 
  NewLikeParams,
  UpdateLikeParams, 
  updateLikeSchema,
  insertLikeSchema, 
  likeIdSchema 
} from "@/lib/db/schema/likes";
import { getUserAuth } from "@/lib/auth/utils";
import { Knock } from "@knocklabs/node";

const knockClient = new Knock(process.env.NEXT_PUBLIC_KNOCK_SECRET_API_KEY);

export const createLike = async (like: NewLikeParams) => {
  const { session } = await getUserAuth();
  const newLike = insertLikeSchema.parse({ ...like, userId: session?.user.id! });
  try {
    const l = await db.like.create({ data: newLike });
    const otherUser = await db.user.findMany({
      where : {
        id: {
          not :session?.user.id
        }
      }
    })
    await knockClient.notify('post-like', {
        actor : session?.user.id,
        recipients : otherUser.map(user => user.id),
        data: {
          variableKey : {
            action : 'like',
            target : l,
          }
        }
    })
    return { like: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateLike = async (id: LikeId, like: UpdateLikeParams) => {
  const { session } = await getUserAuth();
  const { id: likeId } = likeIdSchema.parse({ id });
  const newLike = updateLikeSchema.parse({ ...like, userId: session?.user.id! });
  try {
    const l = await db.like.update({ where: { id: likeId, userId: session?.user.id! }, data: newLike})
    return { like: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteLike = async (id: LikeId) => {
  const { session } = await getUserAuth();
  const { id: likeId } = likeIdSchema.parse({ id });
  try {
    const l = await db.like.delete({ where: { id: likeId, userId: session?.user.id! }})
    return { like: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

