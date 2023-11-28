import { feedSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getFeeds } from "@/lib/api/feeds/queries";


// Schema for feeds - used to validate API requests
export const insertFeedSchema = feedSchema.omit({ id: true });

export const insertFeedParams = feedSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateFeedSchema = feedSchema;

export const updateFeedParams = updateFeedSchema.extend({}).omit({ 
  userId: true
});

export const feedIdSchema = updateFeedSchema.pick({ id: true });

// Types for feeds - used to type API request params and within Components
export type Feed = z.infer<typeof updateFeedSchema>;
export type NewFeed = z.infer<typeof insertFeedSchema>;
export type NewFeedParams = z.infer<typeof insertFeedParams>;
export type UpdateFeedParams = z.infer<typeof updateFeedParams>;
export type FeedId = z.infer<typeof feedIdSchema>["id"];
    
// this type infers the return from getFeeds() - meaning it will include any joins
export type CompleteFeed = Awaited<ReturnType<typeof getFeeds>>["feeds"][number];

