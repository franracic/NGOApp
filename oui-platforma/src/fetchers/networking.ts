import {
  IConnection,
  IDiscussion,
  IEvent,
  IGroup,
  IGroupMessage,
  IMessage,
  IUser,
} from "@/typings/course";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export const useUsers = (searchQuery: string = "", page: number = 1) => {
  const url = `${swrKeys.users}?search=${encodeURIComponent(
    searchQuery
  )}&page=${page}`;
  return useSWR(url, fetcher<IUser[]>);
};

export const useConnections = () => {
  return useSWR(swrKeys.connections, fetcher<IUser[]>);
};

export const useConnectionRequests = () => {
  return useSWR(swrKeys.connectionRequests, fetcher<IConnection[]>);
};

export const useSendConnectionRequest = () => {
  return useSWRMutation(
    swrKeys.connectionRequests,
    async (url, { arg: recipientId }: { arg: number }) => {
      return fetcher<IConnection>(url, {
        method: "POST",
        body: JSON.stringify({ recipient_id: recipientId }),
      });
    }
  );
};

export const useAcceptConnectionRequest = () => {
  return useSWRMutation(
    `${swrKeys.connectionRequests}accept/`,
    async (url, { arg: requestId }: { arg: number }) => {
      return fetcher<IConnection>(url, {
        method: "POST",
        body: JSON.stringify({ request_id: requestId }),
      });
    }
  );
};

export const useRejectConnectionRequest = () => {
  return useSWRMutation(
    `${swrKeys.connectionRequests}reject/`,
    async (url, { arg: requestId }: { arg: number }) => {
      return fetcher<void>(url, {
        method: "POST",
        body: JSON.stringify({ request_id: requestId }),
      });
    }
  );
};

export const useMessages = (userId: number) => {
  const url = `${swrKeys.messages}?user_id=${userId}`;
  return useSWR(url, fetcher<IMessage[]>, { refreshInterval: 3000 });
};

export const useGroupMessages = (groupId: number) => {
  const url = `${swrKeys.groupMessages}?group_id=${groupId}`;
  return useSWR(url, fetcher<IGroupMessage[]>, { refreshInterval: 3000 });
};

export const useSendMessage = () => {
  return useSWRMutation(
    swrKeys.messages,
    async (
      url,
      { arg }: { arg: { recipient_id: number; content: string } }
    ) => {
      return fetcher<IMessage>(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    }
  );
};

export const useUserInfo = (userId: number) => {
  const url = swrKeys.userInfo(userId);
  return useSWR(url, fetcher<IUser>);
};

export function newDiscussions(discussion: Partial<IDiscussion>) {
  return fetcher<IDiscussion>(swrKeys.discussions, {
    method: "POST",
    body: JSON.stringify(discussion),
  });
}

export const useJoinGroup = () => {
  return useSWRMutation(
    `${swrKeys.groups}`,
    async (url: string, { arg: groupId }: { arg: number }) => {
      return fetcher<void>(`${swrKeys.groups}${groupId}/join/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
};

export const useLeaveGroup = () => {
  return useSWRMutation(
    `${swrKeys.groups}`,
    async (url: string, { arg: groupId }: { arg: number }) => {
      return fetcher<void>(`${swrKeys.groups}${groupId}/leave/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  );
};

export const useSendGroupMessage = () => {
  return useSWRMutation(
    swrKeys.groupMessages,
    async (url, { arg }: { arg: { group: number; content: string } }) => {
      return fetcher<IMessage>(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
    }
  );
};

export function newGroup(group: Partial<IGroup>) {
  return fetcher<IGroup>(swrKeys.groups, {
    method: "POST",
    body: JSON.stringify(group),
  });
}

export const useEvents = () => {
  return useSWR(swrKeys.events, fetcher<IEvent[]>);
};

export const useEvent = (id: number) => {
  return useSWR(swrKeys.eventDetails(id), fetcher<IEvent>);
};

export const newEvent = (event: Partial<IEvent>) => {
  return fetcher<IEvent>(swrKeys.events, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useAttendEvent = () => {
  return useSWRMutation(
    swrKeys.events,
    async (url: string, { arg: eventId }: { arg: number }) => {
      return fetcher(`${swrKeys.events}${eventId}/attend/`, {
        method: "POST",
      });
    }
  );
};

export const useUnattendEvent = () => {
  return useSWRMutation(
    swrKeys.events,
    async (url: string, { arg: eventId }: { arg: number }) => {
      return fetcher(`${swrKeys.events}${eventId}/unattend/`, {
        method: "POST",
      });
    }
  );
};
