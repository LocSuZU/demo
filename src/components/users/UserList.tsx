"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";



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

  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{user.name}</div>
      </div>
      <div className="w-full">
        <div>{user.email}</div>
      </div>
      <div className="w-full">
        <Button >Follow</Button>
      </div>
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
    </div>
  );
};

