// @ts-nocheck
import { db } from "@/lib/db/index";
import { type FolloId, folloIdSchema } from "@/lib/db/schema/follow";

export const getFollos = async () => {
  const f = await db.follo.findMany({});
  return { follow: f };
};

export const getFolloById = async (id: FolloId) => {
  const { id: folloId } = folloIdSchema.parse({ id });
  const f = await db.follo.findFirst({
    where: { id: folloId}});
  return { follow: f };
};

