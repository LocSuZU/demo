import { db } from "@/lib/db/index";
import { 
  MediaId, 
  FeedId,
  NewMediaParams,
  UpdateMediaParams, 
  updateMediaSchema,
  insertMediaSchema, 
  mediaIdSchema 
} from "@/lib/db/schema/medias";

export const createMedia = async (media: NewMediaParams) => {
  const newMedia = insertMediaSchema.parse(media);
  try {
    const m = await db.media.create({ data: newMedia });
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateMedia = async (id: MediaId, media: UpdateMediaParams) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  const newMedia = updateMediaSchema.parse(media);
  try {
    const m = await db.media.update({ where: { id: mediaId }, data: newMedia})
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteMedia = async (id: MediaId) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  try {
    const m = await db.media.delete({ where: { id: mediaId }})
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};


