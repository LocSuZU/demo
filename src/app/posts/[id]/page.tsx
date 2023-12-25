'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompletePost, Post } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CommentId, NewCommentParams } from "@/lib/db/schema/comments";
import { pusherClient } from "@/lib/pusher";


type Comment = {
  id: string;
  author: string;
  content: string;
  replies?: Comment[];
};

export default function PostDetail({ params, post }: { params: { id: Number }, post: CompletePost }) {
  const id = Number(params.id);
  const [likeCount, setLikeCount] = useState<Number>(0);
  const [dislikeCount, setDislikeCount] = useState<Number>(0);
  const [comments, setComments] = React.useState<Comment[] | null>(null);
  const [comment, setComment] = React.useState<string | null>(null);
  const [reply, setReply] = React.useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data: p, refetch } = trpc.posts.getPostById.useQuery({ postId: id, limit, page }, {
    initialData: { posts: post },
    refetchOnMount: true,
  });



  const session = useSession();
  const router = useRouter();
  const utils = trpc.useContext();
  const { toast } = useToast();

  useEffect(() => {
    if (p?.posts) {
      setLikeCount(p?.posts?.totalLike)
      setDislikeCount(p?.posts?.totalDislike)
      setComments(p?.posts?.comments)
      const chanel = pusherClient.subscribe(p?.posts?.id?.toString());
      chanel.bind('client:like', (data) => {
        setLikeCount(data.totalLike)
        setDislikeCount(data.totalDislike)
        setUser(data?.session?.user.name == session?.data?.user.name ? null : data?.session?.user.name || data?.session?.user.email)

      });

      chanel.bind('client:dislike', (data) => {
        setLikeCount(data.totalLike)
        setDislikeCount(data.totalDislike)
        setUser(data?.session?.user.name == session?.data?.user.name ? null : data?.session?.user.name || data?.session?.user.email)
      });

      chanel.bind('client:comment', (data) => {
        setComments((comments) => {
          const newComments = [...(comments || []), data];
          if (newComments.length > limit) {
            return newComments.slice(0, limit);
          }
          return newComments;
        });
      });

      chanel.bind('client:update-comment', (data) => {
        if (data.parentId) {
          setComments((comments) =>
            comments?.map((comment) => {
              if (comment.id === data.parentId) {
                return {
                  ...comment,
                  replies: comment.replies?.map((reply) => {
                    if (reply.id === data.id) {
                      return {
                        ...reply,
                        content: data.content
                      }
                    }
                    return reply;
                  }),
                };
              }
              return comment;
            })
          );
        } else {
          setComments((comments) =>
            comments?.map((comment) => {
              if (comment.id === data.id) {
                return {
                  ...comment,
                  content: data.content,
                };
              }
              return comment;
            })
          );
        }
      });


      chanel.bind('client:reply', (data) => {
        setComments((comments) =>
          comments?.map((comment) => {
            if (comment.id === data.parentId) {
              if (comment.replies) {
                return {
                  ...comment,
                  replies: [...comment.replies, data],
                };
              } else {
                return {
                  ...comment,
                  replies: [data],
                };
              }
            }
            return comment;
          })
        );
      });

      chanel.bind('client:delete', (data) => {
        if (data.parentId) {
          setComments((comments) =>
            comments?.map((comment) => ({
              ...comment,
              replies: comment.replies?.filter((reply) => reply.id !== data.id),
            }))
          );

        } else {
          const newComments = comments?.filter((comment) => comment.id !== data.id);
          setComments(newComments!);
        }
      });


      return () => {
        pusherClient.unsubscribe(p?.posts?.id?.toString()!);
      }
    }
    refetch();
  }, [p, page, refetch]);

  const onSuccess = async (action: "like" | "dislike") => {
    await utils.posts.getPosts.invalidate();
    router.refresh();
  };

  const { mutate: LikePost } =
    trpc.posts.likesPost.useMutation({
      onSuccess: (data) => {
        onSuccess("like");
      },
    });

  const { mutate: DisLikePost } =
    trpc.posts.dislikedPost.useMutation({
      onSuccess: (data) => {
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
    DisLikePost({
      postId: p?.posts?.id as number,
      liked: false,
      disliked: true,
      id: "",
      userId: ""
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

  const { mutate: UpdateComment } = trpc.comments.updateComment.useMutation({
    onSuccess: async (data) => {
      await utils.posts.getPosts.invalidate();
      router.refresh();
      toast({
        title: 'Success',
        description: `Post updated comment!`,
        variant: "default",
      });
    },
  });

  const { mutate: deleteComment, isLoading: isDeleting } =
    trpc.comments.deleteComment.useMutation({
      onSuccess: async () => {
        await utils.posts.getPosts.invalidate();
        router.refresh();
        toast({
          title: 'Success',
          description: `Post delete comment!`,
          variant: "default",
        });
      }
    });


  const { mutate: CreateReply } = trpc.posts.createCommentReply.useMutation({
    onSuccess: async (data) => {
      await utils.posts.getPosts.invalidate();
      router.refresh();
      toast({
        title: 'Success',
        description: `Post created reply!`,
        variant: "default",
      });
    },
  });

  const handleSubmitComment = (event: React.MouseEvent<HTMLButtonElement>, type: "create" | "update") => {
    switch (type) {
      case "create":
        const create = {
          content: comment,
          userId: session.data?.user?.id,
          postId: p?.posts?.id!,
        }
        CreateComment(create);
        break;
      case "update":
        const commentElement = document.getElementById('commentId');
        if (commentElement) {
          const update = {
            content: comment,
            userId: session.data?.user?.id,
            postId: p?.posts?.id!,
            id: commentElement?.value!
          }
          UpdateComment(update);
        }
        break;
      default:
        break;
    }
  }

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const comment = event.target.value;
    setComment(comment);
  }

  const handleReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reply = e.target.value;
    setReply(reply);
  };

  const handleSubmitReply = (e: React.MouseEvent<HTMLButtonElement>, commentId: CommentId, type: 'create' | 'update') => {
    switch (type) {
      case "create":
        const replyComment = {
          content: reply,
          userId: session.data?.user?.id,
          postId: p?.posts?.id!,
          parentId: commentId,
        }
        CreateReply(replyComment);
        break;
      case "update":
        const commentElement = document.getElementById('commentId');
        const parentIdElement = document.getElementById('parentId');
        if (parentIdElement && commentElement) {
          const update = {
            content: reply,
            userId: session.data?.user?.id,
            postId: p?.posts?.id!,
            parentId: commentElement?.value!,
            id: parentIdElement?.value!
          }
          UpdateComment(update);
        }
        break;
      default:
        break;
    }
  }


  const loadMoreComments = async () => {
    setPage(prevPage => prevPage + 1);

    const newComments = await refetch({
      limit: limit,
      page: page,
    });

    console.log(111, newComments);


    // const newComments = [...comments, ...p.posts.comments];

    // setHasMore(newComments.length === limit);
  };

  function renderComments(comments: Comment[]) {
    return comments?.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="author">{comment.author}</div>
        <div className="content">{comment.content}
        </div>
        {
          comment.replies && comment.replies.map((reply) => {
            return (
              <input key={reply.id} type="hidden" value={reply.id} name="parentId" id="parentId" />
            )
          })
        }
        <input type="hidden" value={comment.id} name="commentId" id="commentId" />

        <div>
          <input type="text" placeholder="Write a reply..." onChange={(e) => handleReply(e)} />
          <Button onClick={(e) => handleSubmitReply(e, comment.id, 'create')}>Reply</Button>
          <Button onClick={(e) => handleSubmitReply(e, comment.id, 'update')}>Update</Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteComment({ id: comment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
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
        user && (
          <div>
            <p>{user} đã like/dislike bài viết của bạn</p>
          </div>
        )
      }
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
              {comments && renderComments(comments)}
              {hasMore && <button onClick={loadMoreComments}>Load More</button>}
            </div>
            <input
              type="text"
              placeholder="Nhập bình luận của bạn"
              onChange={(e) => handleComment(e)}
            />
            <Button onClick={(event) => handleSubmitComment(event, "create")}>Gửi</Button>
            <Button onClick={(event) => handleSubmitComment(event, "update")}>Sửa</Button>
          </>
        )
      }
    </div>
  );
}



