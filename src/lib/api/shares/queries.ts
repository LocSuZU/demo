import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type ShareId, shareIdSchema } from "@/lib/db/schema/shares";

export const getShares = async () => {
  const { session } = await getUserAuth();
  const s = await db.share.findMany({ where: {userId: session?.user.id!}, include: { post: true}});
  return { shares: s };
};

export const getShareById = async (id: ShareId) => {
  const { session } = await getUserAuth();
  const { id: shareId } = shareIdSchema.parse({ id });
  const s = await db.share.findFirst({
    where: { id: shareId, userId: session?.user.id!},
    include: { post: true }
  });
  return { shares: s };
};

