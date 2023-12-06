import { folloSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getFollos } from "@/lib/api/follow/queries";


// Schema for follow - used to validate API requests
export const insertFolloSchema = folloSchema.omit({ id: true });

export const insertFolloParams = folloSchema.extend({}).omit({ 
  id: true
});

export const updateFolloSchema = folloSchema;

export const updateFolloParams = updateFolloSchema.extend({})

export const folloIdSchema = updateFolloSchema.pick({ id: true });
export const followedIdSchema = updateFolloSchema.pick({ followedId: true });

// Types for follow - used to type API request params and within Components
export type Follo = z.infer<typeof updateFolloSchema>;
export type NewFollo = z.infer<typeof insertFolloSchema>;
export type NewFolloParams = z.infer<typeof insertFolloParams>;
export type UpdateFolloParams = z.infer<typeof updateFolloParams>;
export type FolloId = z.infer<typeof folloIdSchema>["id"];
export type followedId = z.infer<typeof followedIdSchema>["followedId"];
    
// this type infers the return from getFollow() - meaning it will include any joins
export type CompleteFollo = Awaited<ReturnType<typeof getFollos>>["follow"][number];

