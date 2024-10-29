// src/fetchers/networking.ts

import { IConnection, IMessage, IUser } from "@/typings/course";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

// Fetch users with search functionality and pagination
export const useUsers = (searchQuery: string = "", page: number = 1) => {
  const url = `${swrKeys.users}?search=${encodeURIComponent(
    searchQuery
  )}&page=${page}`;
  return useSWR(url, fetcher<IUser[]>);
};

// Fetch current user's connections
export const useConnections = () => {
  return useSWR(swrKeys.connections, fetcher<IUser[]>);
};

// Fetch connection requests
export const useConnectionRequests = () => {
  return useSWR(swrKeys.connectionRequests, fetcher<IConnection[]>);
};

// Send a connection request
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

// Accept a connection request
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

// Reject a connection request
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

// Fetch messages between the current user and another user
export const useMessages = (userId: number) => {
  const url = `${swrKeys.messages}?user_id=${userId}`;
  return useSWR(url, fetcher<IMessage[]>);
};

// Send a message
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

// Fetch individual user info
export const useUserInfo = (userId: number) => {
  const url = swrKeys.userInfo(userId);
  return useSWR(url, fetcher<IUser>);
};
