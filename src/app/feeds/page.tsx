import FeedList from "@/components/feeds/FeedList";
import NewFeedModal from "@/components/feeds/FeedModal";
import { getFeeds } from "@/lib/api/feeds/queries";
import { checkAuth } from "@/lib/auth/utils";

export default async function Feeds() {
  await checkAuth();
  const { feeds } = await getFeeds();  

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Feeds</h1>
        <NewFeedModal />
      </div>
      <FeedList feeds={feeds} />
    </main>
  );
}
