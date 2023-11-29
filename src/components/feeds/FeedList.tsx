"use client";
import { CompleteFeed } from "@/lib/db/schema/feeds";
import { trpc } from "@/lib/trpc/client";
import FeedModal from "./FeedModal";
import Image from "next/image";
import { Key } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function FeedList({ feeds }: { feeds: CompleteFeed[] }) {
  const { data: f } = trpc.feeds.getFeeds.useQuery(undefined, {
    initialData: { feeds },
    refetchOnMount: false,
  });



  if (f.feeds.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {f.feeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </ul>
  );
}



const Feed = ({ feed }: { feed: CompleteFeed }) => {

  return (
    <li className="flex-col justify-between my-2">
      {feed.medias.length > 0 && (
        <Carousel showThumbs={false}>
          {feed.medias.map((media: { id: Key | null | undefined; url: string; }) => (
            <div className="flex flex-col justify-center items-center w-full" key={feed.id}>
              <Image src={media.url} width={50} height={50} alt={media.url} />
              <div className="mt-2 text-center">{feed.content}</div>
            </div>
          ))}
        </Carousel>
      )}
      <FeedModal feed={feed} />
    </li>
  );
};



const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No feeds</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new feed.
      </p>
      <div className="mt-6">
        <FeedModal emptyState={true} />
      </div>
    </div>
  );
};

