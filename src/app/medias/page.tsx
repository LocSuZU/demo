import MediaList from "@/components/medias/MediaList";
import NewMediaModal from "@/components/medias/MediaModal";
import { getMedias } from "@/lib/api/medias/queries";

export default async function Medias() {
  const { medias } = await getMedias();  

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Medias</h1>
        <NewMediaModal />
      </div>
      <MediaList medias={medias} />
    </main>
  );
}
