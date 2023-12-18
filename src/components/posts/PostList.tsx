"use client";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";
import CommentModal from "./CommentModal";
import Image from "next/image";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import io from 'socket.io-client'


export default function PostList({ posts }: { posts: CompletePost[] }) {
  const { data: p } = trpc.posts.getPosts.useQuery(undefined, {
    initialData: { posts },
    refetchOnMount: false,
  });




  if (p.posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {p.posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
}
let socket;
const Post = ({ post }: { post: CompletePost }) => {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      // setMessages((currentMsg) => [
      //   ...currentMsg,
      //   { author: msg.author, message: msg.message },
      // ]);
      console.log(msg);
    });
  };

  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const onSuccess = async (action: "like" | "dislike") => {
    await utils.posts.getPosts.invalidate();
    router.refresh();
    toast({
      title: 'Success',
      description: `Post ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: LikePost } =
    trpc.posts.likesPost.useMutation({
      onSuccess: () => onSuccess("like"),
    });

  const { mutate: DisLikePost } =
    trpc.posts.dislikedPost.useMutation({
      onSuccess: () => onSuccess("dislike"),
    });

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    const checkLike = post.likes.find((like) => like.userId === session.data?.user?.id && post.id === like.postId);
    if (checkLike) {
      // Add your logic here when liked is true
      toast({
        title: 'Error',
        description: `Post already liked by you!`,
      });
    }
    else {
      LikePost({
        postId: post.id,
        liked: true,
        disliked: false,
        userId: ""
      });
    }
  }

  const handleDisLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    const checkLike = post.likes.find((like) => like.userId === session.data?.user?.id && post.id === like.postId);
    //@ts-ignore
    if (checkLike) {
      // Add your logic here when liked is true
      toast({
        title: 'Error',
        description: `Post already disliked by you!`,
      });
    }
    else {
      DisLikePost({
        postId: post.id,
        liked: false,
        disliked: true,
        id: checkLike?.id as string,
      });
    }
  }

  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{post.title}</div>
      </div>
      <div className="w-full">
        <div>{post.content}</div>
      </div>
      <div className="w-full">
        <div>{post.slug}</div>
      </div>
      <div className="display: block; margin : 0 auto; height : 100; margin-left: 20px;">
        <Image src={post.image || ''} alt={post.title} width={100} height={100} />
      </div>
      <div className="w-full">
        <div>Total Like</div>
      </div>
      <div className="w-full">
        <div>Total Dislike
        </div>
      </div>
      <div className="">
        <Button onClick={(event) => handleLike(event)}>Like</Button>
      </div>
      <div className="">
        <Button onClick={(event) => handleDisLike(event)}>DisLike</Button>
      </div>
      <div className="display: block; margin : 0 auto; height : 100; margin-left: 20px;">
        <Button>Share</Button>
      </div>
      <div className="display: block; margin : 0 auto; height : 100; margin-left: 20px;">
        <textarea className="border border-gray-300 rounded-md" placeholder="Comment" />
        <Button>Comment</Button>
      </div>
      <PostModal post={post} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <PostModal emptyState={true} />
      </div>
    </div>
  );
};

