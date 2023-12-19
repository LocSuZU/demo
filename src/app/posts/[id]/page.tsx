'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import io from 'socket.io-client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CommentId } from "@/lib/db/schema/comments";


export default function PostDetail({ params, post }: { params: { id: Number }, post: CompletePost }) {
  const id = Number(params.id);
  const { data: p } = trpc.posts.getPostById.useQuery({ id }, {
    initialData: { posts: post },
    refetchOnMount: false,
  });
  const [likeCount, setLikeCount] = useState(null);
  const [dislikeCount, setDislikeCount] = useState(null);
  const [comments, setComments] = React.useState<string | null>(null);
  const [reply, setReply] = React.useState<string | null>(null);

  const session = useSession();
  const router = useRouter();
  const utils = trpc.useContext();
  const { toast } = useToast();


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
    socket.on('add-comment', (data) => {
      console.log(444, data);
      // if (data) {
      //   setLikeCount(data.likesCount)
      //   setDislikeCount(data.dislikesCount)
      // }
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

  const { mutate: CreateComment } = trpc.comments.createComment.useMutation({
    onSuccess: async (data) => {
      await utils.posts.getPosts.invalidate();
      router.refresh();
      toast({
        title: 'Success',
        description: `Post created comment!`,
        variant: "default",
      });
    },
  });

  const handleSubmitComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    const comment = {
      content: comments,
      userId: session.data?.user?.id,
      postId: p?.posts?.id || 0,
    }
    CreateComment(comment);
  }

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const comment = event.target.value;
    setComments(comment);
  }

  const handleReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reply = e.target.value;
    setReply(reply);
  };

  const handleSubmitReply = (e: React.MouseEvent<HTMLInputElement>, commentId: CommentId) => {
    const replyComment = {
      content: reply,
      userId: session.data?.user?.id,
      postId: p?.posts?.id || 0,
      commentId: commentId,
    }
    CreateComment(replyComment, commentId);
  }


  function renderComments(comments) {
    return comments.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="author">{comment.author}</div>
        <div className="content">{comment.content}</div>
        <div>
          <input type="text" placeholder="Write a reply..." onChange={(e) => handleReply(e)} />
          <button onClick={(e) => handleSubmitReply(e, comment.id)}>Reply</button>
        </div>
        {comment.replies && (
          <ul className="replies">
            {renderComments(comment.replies)}
          </ul>
        )}
      </div>
    ));
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
            <div>
              {p?.posts?.Comment && renderComments(p.posts.Comment)}
            </div>
            <input
              type="text"
              placeholder="Nhập bình luận của bạn"
              onChange={(e) => handleComment(e)}
            />
            <Button onClick={(event) => handleSubmitComment(event)}>Gửi</Button>
          </>
        )
      }
    </div>
  );
}



