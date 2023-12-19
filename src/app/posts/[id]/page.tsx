'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import io from 'socket.io-client'
import { Button } from "@/components/ui/button";

export default function PostDetail({ params, post }: { params: { id: Number }, post: CompletePost }) {
  const id = Number(params.id);
  const { data: p } = trpc.posts.getPostById.useQuery({ id }, {
    initialData: { posts: post },
    refetchOnMount: false,
  });
  const [likeCount, setLikeCount] = useState(null);
  const [dislikeCount, setDislikeCount] = useState(null);
  const [comments, setComments] = useState(null);

  const session = useSession();
  const router = useRouter();
  const utils = trpc.useContext();

  const socket = io('http://localhost:3000', {
    path: '/socket.io'
  });

  useEffect(() => {
    if (p?.posts) {
      setLikeCount(p?.posts?.totalLike)
      setDislikeCount(p?.posts?.totalDislike)
    }
    socket.on('add-like', (data) => {
      if (data) {
        setLikeCount(data.likesCount)
        setDislikeCount(data.dislikesCount)
      }
    });
    socket.on('dis-like', (data) => {
      if (data) {
        setLikeCount(data.likesCount)
        setDislikeCount(data.dislikesCount)
      }
    });

  }, [p]);


  const onSuccess = async (action: "like" | "dislike") => {
    await utils.posts.getPosts.invalidate();
    router.refresh();
  };

  const { mutate: LikePost } =
    trpc.posts.likesPost.useMutation({
      onSuccess: (data) => {
        socket.emit('like', data);
        onSuccess("like");
      },
    });

  const { mutate: DisLikePost } =
    trpc.posts.dislikedPost.useMutation({
      onSuccess: (data) => {
        socket.emit('dis-like', data);
        onSuccess("dislike");
      },
    });

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    LikePost({
      postId: p?.posts?.id as number,
      liked: true,
      disliked: false,
      userId: "",
    })
  }

  const handleDisLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    const getLikeOrDisLike = p?.posts?.likes?.find((like) => like.userId === session.data?.user?.id && p?.posts?.id === like.postId);

    //@ts-ignore
    DisLikePost({
      postId: p?.posts?.id as number,
      liked: false,
      disliked: true,
      id: getLikeOrDisLike?.id as string
    })
  }


  const handleComment = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  return (
    <div>
      {
        p?.posts && (
          <>
            <div>
              <h1>{p?.posts?.title}</h1>
              <p>{p?.posts?.content}</p>
              <label>
                Likes :
                <p>{likeCount}</p>
              </label>
              <label>
                DisLikes :
                <p>{dislikeCount}</p>
              </label>

            </div><div>
              <Button onClick={(event) => handleLike(event)}>Like</Button>
              <Button onClick={(event) => handleDisLike(event)}>DisLike</Button>
            </div>
            <ul>
              {comments?.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Nhập bình luận của bạn"
            // onInput={(e) => setComments(e.target.value)}
            />
            <Button onClick={(event) => handleComment(event)}>Gửi</Button>
          </>
        )
      }
    </div>
  );
}



