import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { followedId } from "@/lib/db/schema/follow";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  const u = await db.user.findMany({ where: { id:  { not : session?.user.id } } , include: { follows: true, followers: true } });
  return { users: u };
};

export const getUsersFollowers = async (followedId: followedId) => {
  const { session } = await getUserAuth();
  const u = await db.follo.findMany({
    where: { followerId: session?.user.id, followedId: followedId }
  });
  if (u.length > 0) {
    return { check: true };
  }
  return { check: false };
};


