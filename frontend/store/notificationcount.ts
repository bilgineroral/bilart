import * as React from "react";
import {atom, useAtom} from "jotai";

export const notificationCountAtom = atom<number>(0);

export const useNoticationCount = (pollDelay : number) => {
  const [notificationCount, setNotificationCount] = useAtom(notificationCountAtom);

  React.useEffect(() => {
    const pollInterval = setInterval(() => {
      setNotificationCount(prev => prev+1);
    }, pollDelay);

    return () => clearInterval(pollInterval);
  }, []);

  return [notificationCount];
}

