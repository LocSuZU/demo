'use client'

import { useState, useRef, useEffect } from "react";
import {
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react-notification-feed";
import { useSession } from "next-auth/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react-notification-feed/dist/index.css";

const YourAppLayout = ({ knockToken }: { knockToken: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && status === 'authenticated' ? (
      <KnockFeedProvider
        apiKey={'pk_test_4inGJzHX6nnVQRyFCm20AfVfR9FXp1DbTnhI6f8e-5U'}
        feedId={'c550f6a3-90e5-4e38-acdc-0d92d2a450af'}
        //@ts-ignore
        userId={session?.user.id}
      // userToken={knockToken}
      // In production, you must pass a signed userToken
      // and enable enhanced security mode in your Knock dashboard
      // userToken={currentUser.knockUserToken}
      >
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    ) : (
      <div> Không tồn tại client </div>
    )
  );
};

export default YourAppLayout;