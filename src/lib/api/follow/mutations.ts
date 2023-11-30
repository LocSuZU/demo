import { db } from "@/lib/db/index";
import { 
  FolloId, 
  NewFolloParams,
  UpdateFolloParams, 
  updateFolloSchema,
  insertFolloSchema, 
  folloIdSchema 
} from "@/lib/db/schema/follow";

export const createFollo = async (follo: NewFolloParams) => {
  const newFollo = insertFolloSchema.parse(follo);
  try {
    // @ts-ignore
    const f = await db.follo.create({ data: newFollo });
    return { follo: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateFollo = async (id: FolloId, follo: UpdateFolloParams) => {
  const { id: folloId } = folloIdSchema.parse({ id });
  const newFollo = updateFolloSchema.parse(follo);
  try {
    // @ts-ignore
    const f = await db.follo.update({ where: { id: folloId }, data: newFollo})
    return { follo: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteFollo = async (id: FolloId) => {
  const { id: folloId } = folloIdSchema.parse({ id });
  try {
    // @ts-ignore
    const f = await db.follo.delete({ where: { id: folloId }})
    return { follo: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

