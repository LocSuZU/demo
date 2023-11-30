import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  const u = await db.user.findMany({ where: { id:  { not : session?.user.id } } , include: { follows: true, followers: true } });
  return { users: u };
};

export const checkUserFollowUser = async ( followedId : string , followerId: string) => {
  const { session } = await getUserAuth();
  const u = await db.follo.findFirst({ where: { followerId: session?.user.id, followedId : followedId   } , include: { follows: true, followers: true } });
  return { users: u };
};


