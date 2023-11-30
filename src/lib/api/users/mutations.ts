
import { db } from "@/lib/db/index";
import { 
  insertFolloSchema,
  NewFolloParams,
  folloIdSchema,
  FolloId
} from "@/lib/db/schema/follow";


export const createFollowUser = async (follo: NewFolloParams) => {
  const newFollo = insertFolloSchema.parse(follo);
  try {
    const f = await db.follo.create({
      data: {
        follower: {
          connect: {
            id: newFollo.followerId
          }
        },
        followed: {
          connect: {
            id: newFollo.followedId
          }
        }
      }
    });
    return { follo: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteFollowUser = async (id: FolloId ) => {
  const { id: FolloId } = folloIdSchema.parse({ id });
  try {
    const u = await db.follo.delete({ where: {id : FolloId}})
    return { users: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
  
}