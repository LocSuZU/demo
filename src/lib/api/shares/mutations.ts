import { db } from "@/lib/db/index";
import { 
  ShareId, 
  NewShareParams,
  UpdateShareParams, 
  updateShareSchema,
  insertShareSchema, 
  shareIdSchema 
} from "@/lib/db/schema/shares";
import { getUserAuth } from "@/lib/auth/utils";

export const createShare = async (share: NewShareParams) => {
  const { session } = await getUserAuth();
  const newShare = insertShareSchema.parse({ ...share, userId: session?.user.id! });
  try {
    const s = await db.share.create({ data: newShare });
    return { share: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateShare = async (id: ShareId, share: UpdateShareParams) => {
  const { session } = await getUserAuth();
  const { id: shareId } = shareIdSchema.parse({ id });
  const newShare = updateShareSchema.parse({ ...share, userId: session?.user.id! });
  try {
    const s = await db.share.update({ where: { id: shareId, userId: session?.user.id! }, data: newShare})
    return { share: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteShare = async (id: ShareId) => {
  const { session } = await getUserAuth();
  const { id: shareId } = shareIdSchema.parse({ id });
  try {
    const s = await db.share.delete({ where: { id: shareId, userId: session?.user.id! }})
    return { share: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

