
import { db } from "@/lib/db/index";
import { 
  PostId, 
  NewPostParams,
  UpdatePostParams, 
  updatePostSchema,
  insertPostSchema, 
  postIdSchema,
  NewLikeParams,
  insertLikeSchema,
  LikeId,
  UpdateLikeParams,
  likeIdSchema,
  updateLikeSchema
} from "@/lib/db/schema/posts";
import { getUserAuth } from "@/lib/auth/utils";
import { PrismaClient } from "@prisma/client";
import { resend } from "@/lib/email/index";
import { EmailContent } from "@/components/emails/EmailContent";
const io = global.io;


export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
  const prisma = new PrismaClient().$extends({
    query: {
      post: {
        async create({ model, operation, args, query }) {
          const { session } = await getUserAuth();
          const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
          try {
            const p = await db.post.create({ data: newPost });
            if(p) {
              const u = await db.user.findUnique({ where: { id:  session?.user.id  } , 
                include: { followers:  {
                  include: { 
                    followed: true,
                    follower : true
                  }
                } } 
              });
              if(u){
                const { followers } = u;
                followers.forEach( async (Item : any) => {
                  const {follower} = Item;
                  const { name, email } = follower;
                  await resend.emails.send({
                    from: `Kirimase <${process.env.RESEND_EMAIL}>`,
                    to: [email],
                    subject: "Hello world!",
                    react: EmailContent({ name: name, post: p }),
                    text: "Email powered by Resend.",
                  });
                });
              }
            }
            return { post: p };
          } catch (err) {
            const message = (err as Error).message ?? "Error, please try again";
            console.error(message);
            return { error: message };
          }
        },
      },
    },
  })
  await prisma.post.create({data : newPost})
};


export const updatePost = async (id: PostId, post: UpdatePostParams) => {
  const { session } = await getUserAuth();
  const { id: postId } = postIdSchema.parse({ id });
  const newPost = updatePostSchema.parse({ ...post, userId: session?.user.id! });
  try {
    const p = await db.post.update({ where: { id: postId }, data: newPost})
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deletePost = async (id: PostId) => {
  const { id: postId } = postIdSchema.parse({ id });

  try {
    const p = await db.post.delete({ where: { id: postId }})
    return { post: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const likesPost =  async (like :NewLikeParams ) => {
  const { session } = await getUserAuth();
  const existingLike = await db.like.findFirst({ where: { postId : like.postId, userId: session?.user.id! } });

  if(!existingLike) {
    const newLike = insertLikeSchema.parse({...like, userId: session?.user.id! });
    try {
      const l = await db.like.create({ data: newLike });
      const getLike = await db.like.findUnique({ where: { id: l.id }, include: { post: true, user: true } });
      const totalLike = getLike?.post?.totalLike! + 1;
      const totalDislike = getLike?.post?.totalDislike - 1 < 0 ? 0 : getLike?.post?.totalDislike - 1;
      const updatePost = await db.post.update({ where: { id: getLike?.post?.id! }, data: { totalLike: totalLike, totalDislike: totalDislike } });
      io.emit('add-like', updatePost);
      return { like: getLike };
    } catch (err) {
      const message = (err as Error).message ?? "Error, please try again";
      console.error(message);
      return { error: message };
    }
  } else {
    if(existingLike.liked) {
      return false;
    } else if(existingLike.disliked) {
      try {
        const l = await db.like.update({ where: { id: existingLike.id }, data: {
          postId: existingLike.postId,
          liked: true,
          userId: session?.user.id!,
          disliked : false
        }});    
        const getPost = await db.post.findUnique({ where: { id: like.postId },  include: { user: true , likes : true, Share : true , Comment : true } });
        const totalLike = getPost?.totalLike! + 1;
        const totalDislike = getPost?.totalDislike! - 1 < 0 ? 0 : getPost?.totalDislike! - 1;
        const updatePost = await db.post.update({ where: { id: like.postId }, data: { totalLike: totalLike, totalDislike: totalDislike } });
        const getLike = await db.like.findUnique({ where: { id: l.id }, include: { post: true, user: true } });
        io.emit('add-like', updatePost);
        return { like: getLike };
      } catch (err) {
        const message = (err as Error).message ?? "Error, please try again";
        console.error(message);
        return { error: message };
      }
    } else {
      return;
    }
  } 
};

export const dislikePost =  async (id: LikeId, like: UpdateLikeParams) => {
  const { session } = await getUserAuth();
  const { id: LikeId } = likeIdSchema.parse({ id });
  try {
    const existingLike = await db.like.findUnique({ where: { id: LikeId } });
    if (existingLike && existingLike.disliked) {
      return ;
    }
    const l = await db.like.update({ where: { id: LikeId }, data: {
      postId: like.postId,
      liked: false,
      userId: session?.user.id!,
      disliked : true,
    } });
    const getPost = await db.post.findUnique({ where: { id: like.postId },  include: { user: true , likes : true, Share : true , Comment : true } });
    const totalLike = getPost?.totalLike! - 1 < 0 ? 0 : getPost?.totalLike! - 1;
    const totalDislike = getPost?.totalDislike! + 1;
    const updatePost = await db.post.update({ where: { id: like.postId }, data: { totalLike: totalLike, totalDislike: totalDislike } });
    const getLike = await db.like.findUnique({ where: { id: l.id }, include: { post: true, user: true } });
    io.emit('dis-like', updatePost);
    return { like: getLike };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};



