// import MediaList from "@/components/medias/MediaList";
// import NewMediaModal from "@/components/medias/MediaModal";
// import { getMedias } from "@/lib/api/medias/queries";
import { getUsers } from "@/lib/api/users/queries";


import UserList from "@/components/users/UserList";


export default async function Users() {
  const { users } = await getUsers();

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Users</h1>
        {/* <NewMediaModal /> */}
      </div>
      {/* <MediaList medias={medias} /> */}
      <UserList users={users} />
    </main>
  );
}
