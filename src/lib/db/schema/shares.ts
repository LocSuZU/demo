import { shareSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getShares } from "@/lib/api/shares/queries";


// Schema for shares - used to validate API requests
export const insertShareSchema = shareSchema.omit({ id: true });

export const insertShareParams = shareSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  id: true,
  userId: true
});

export const updateShareSchema = shareSchema;

export const updateShareParams = updateShareSchema.extend({
  postId: z.coerce.string()
}).omit({ 
  userId: true
});

export const shareIdSchema = updateShareSchema.pick({ id: true });

// Types for shares - used to type API request params and within Components
export type Share = z.infer<typeof updateShareSchema>;
export type NewShare = z.infer<typeof insertShareSchema>;
export type NewShareParams = z.infer<typeof insertShareParams>;
export type UpdateShareParams = z.infer<typeof updateShareParams>;
export type ShareId = z.infer<typeof shareIdSchema>["id"];
    
// this type infers the return from getShares() - meaning it will include any joins
export type CompleteShare = Awaited<ReturnType<typeof getShares>>["shares"][number];

