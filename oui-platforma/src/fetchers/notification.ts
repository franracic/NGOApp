import { INotification } from "@/typings/course";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export const useNotifications = () => {
  return useSWR(swrKeys.notifications, fetcher<INotification[]>);
};

export function markNotificationAsRead(notificationId: number) {
    return fetcher(`${swrKeys.notifications}${notificationId}/markRead/`, {
      method: "POST",
    });
  }