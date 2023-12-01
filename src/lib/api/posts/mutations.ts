import { db } from "@/lib/db/index";
import { 
  PostId, 
  NewPostParams,
  UpdatePostParams, 
  updatePostSchema,
  insertPostSchema, 
  postIdSchema 
} from "@/lib/db/schema/posts";
import { getUserAuth } from "@/lib/auth/utils";
import { PrismaClient } from "@prisma/client";
import { resend } from "@/lib/email/index";
import { EmailContent } from "@/components/emails/EmailContent";


export const createPost = async (post: NewPostParams) => {
  const { session } = await getUserAuth();
  const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
  //@ts-ignore
  const prisma = new PrismaClient().$extends({
    query: {
      post: {
        async create({ model, operation, args, query }) {
          const { session } = await getUserAuth();
          const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
          try {
            const p = await db.post.create({ data: newPost });
            if(p) {
              const u = await db.user.findMany({ where: { id:  session?.user.id  } , include: { followers: true } });
              if(u){
                u.forEach( async (follower : any) => {
                  // đây là nơi gửi email cho từng người theo dõi hiện tại chưa verfice đc domain ko send nhiều đc
                  const { name, email } = follower;
                  await resend.emails.send({
                    from: "Kirimase <onboarding@resend.dev>",
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

// export const createPost = async (post: NewPostParams) => {
//   const { session } = await getUserAuth();
//   const newPost = insertPostSchema.parse({ ...post, userId: session?.user.id! });
//   try {
//     const p = await db.post.create({ data: newPost });
//     return { post: p };
//   } catch (err) {
//     const message = (err as Error).message ?? "Error, please try again";
//     console.error(message);
//     return { error: message };
//   }
// };

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
  const { session } = await getUserAuth();
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



