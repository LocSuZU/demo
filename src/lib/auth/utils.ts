import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';



declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};


type UserCreateInput ={
  email: string;
  hashedPassword: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
    signIn: ({user , account, profile  }) => {
      // if(account?.provider === 'credentials') {
      //   return true;
      // } else {
      //   return false;
      // }
      console.log(111, user)
      return user;
    },
  },
  providers: [
     GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: '1130353061279899',
      clientSecret: 'd3c37f6bcc95978a5a63b3d8ea538514',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user =  await db.user.findUnique({ where: { email: credentials?.username } , include: { accounts : true} });
        if(user) {
          return user;
        } else {
          const hashedPassword = bcrypt.hash(credentials?.password, 10);
          const registerUser = await db.user.create({ data: { email: credentials?.username}});
          if(registerUser) {
            const registerAccount = await db.account.create({ data: { provider: 'credentials', 
            type: 'credentials' ,
            userId: registerUser.id, 
            providerAccountId: registerUser.id,
            id_token : hashedPassword}});
            if(registerAccount) {
              return registerAccount;
            }
          }  else {
              return "đăng kí thất bại"
            } 
        }
      }
    }),
  ],
};


export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};

