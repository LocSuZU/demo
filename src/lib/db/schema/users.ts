import { getUsers } from "@/lib/api/users/queries";
import { userSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";

export const updateUsers = userSchema;
export const userIdSchema = updateUsers.pick({ id: true });
export const userEmailSchema = updateUsers.pick({ email: true });
// this type infers the return from getPosts() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["users"][number];
export type UserId = z.infer<typeof userIdSchema>["id"];
export type UserEmail = z.infer<typeof userEmailSchema>["email"];