import { getUsers } from "@/lib/api/users/queries";
// this type infers the return from getPosts() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["users"][number];

