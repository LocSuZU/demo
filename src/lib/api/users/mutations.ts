import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { 
  insertFolloSchema,
  NewFolloParams
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