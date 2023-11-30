import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  const u = await db.user.findMany({ where: { id: session?.user.id! }});
  return { users: u };
};

