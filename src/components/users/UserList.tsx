"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function UserList({ users }: { users: CompleteUser[] }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (!session && !loading) {
    return redirect('api/auth/signin')
  }

  const { data: u } = trpc.users.getUsers.useQuery(undefined, {
    initialData: { users },
    refetchOnMount: false,
  });

  if (u.users.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </ul>
  );
}

const User = ({ user }: { user: CompleteUser }) => {
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  const utils = trpc.useContext();
  const onSuccess = async (action: "create" | "update" | "delete" | "success" | "unfollow") => {
    await utils.users.getUsers.invalidate();
    router.refresh();
    toast({
      title: 'Success',
      description: `Follow ${action}d!`,
      variant: "default",
    });
    if (action === 'unfollow') {
      setFollowing(false);
    }
    if (action === 'success') {
      setFollowing(true);
    }
  };

  const { mutate: followerUser } =
    trpc.users.createFollowUser.useMutation({
      onSuccess: () => onSuccess("success"),
    });

  const { mutate: unfollowUser } =
    trpc.users.deleteFollowUser.useMutation({
      onSuccess: () => onSuccess("unfollow"),
    });

  const { data: isFollowing, error, status, refetch } = trpc.users.getUsersFollowers.useQuery({ followedId: user.id });
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (isFollowing) {
      setFollowing(isFollowing.check);
    }
  }, [isFollowing]);

  const handleFollow = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const followerId = session.data?.user?.id as string;
    const followedId = id;
    // @ts-ignore
    const isAlreadyFollowing = user?.followers.find(item => item.followedId === followedId && item.followerId === followerId);
    if (isAlreadyFollowing && typeof isAlreadyFollowing !== 'undefined') {
      toast({
        title: 'Confirmation',
        description: `You are already following this user. Do you want to unfollow?`,
        variant: "default",
        action: <Button onClick={() => unfollowUser({ id: isAlreadyFollowing.id })} > Unfollow</Button >,
      });
    } else {
      await followerUser({
        followerId: followerId,
        followedId: followedId,
      });
    }
    refetch();
  };
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{user.name}</div>
      </div>
      <div className="w-full">
        <div>{user.email}</div>
      </div>
      <div className="w-full">
        <Button onClick={(e) => handleFollow(e, user.id)}>
          {status === 'loading' ? 'Loading...' : following ? 'Following' : 'Follow'}
        </Button>
      </div>
    </li >
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No posts</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new post.
      </p>
    </div>
  );
};

