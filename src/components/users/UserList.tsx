"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import React from "react";
import { useSession } from "next-auth/react"


export default function UserList({ users }: { users: CompleteUser[] }) {


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
  const session = useSession();
  const mutation = trpc.users.createFollowUser.useMutation();
  const handleFollow = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const data = {
      followerId: session.data?.user?.id as string,
      followedId: id,
    }
    await mutation.mutate(data);
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
        <Button onClick={(e) => handleFollow(e, user.id)}>Follow</Button>
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

