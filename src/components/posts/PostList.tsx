"use client";
import { CompletePost } from "@/lib/db/schema/posts";
import { trpc } from "@/lib/trpc/client";
import PostModal from "./PostModal";
import Image from "next/image";


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

const Post = ({ post }: { post: CompletePost }) => {

  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{post.title}</div>
      </div>
      <div className="display: block; margin : 0 auto; height : 100; margin-left: 20px;">
        <Image src={post.image || ''} alt={post.title} width={100} height={100} />
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

