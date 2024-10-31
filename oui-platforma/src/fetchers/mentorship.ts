import { IMentorshipRequest, IUser } from "@/typings/course";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { swrKeys } from "./swrKeys";

export const useAvailableMentors = (searchQuery: string, page: number) => {
  const url = `${swrKeys.availableMentors}?search=${searchQuery}&page=${page}`;
  return useSWR(url, fetcher<IUser[]>);
};

export const useMentorshipRequests = () => {
  return useSWR(swrKeys.mentorshipRequests, fetcher<IMentorshipRequest[]>);
};

export const useSendMentorshipRequest = () => {
  const { mutate } = useSWR(swrKeys.mentorshipRequests);
  const trigger = async (mentorId: number) => {
    await fetcher(swrKeys.mentorshipRequests, {
      method: "POST",
      body: JSON.stringify({ mentor_id: mentorId }),
    });
    mutate();
  };
  return { trigger };
};

export const useAcceptMentorshipRequest = () => {
  const { mutate } = useSWR(swrKeys.mentorshipRequests);
  const trigger = async (requestId: number) => {
    await fetcher(`${swrKeys.mentorshipRequests}accept/`, {
      method: "POST",
      body: JSON.stringify({ request_id: requestId }),
    });
    mutate();
  };
  return { trigger };
};

export const useRejectMentorshipRequest = () => {
  const { mutate } = useSWR(swrKeys.mentorshipRequests);
  const trigger = async (requestId: number) => {
    await fetcher(`${swrKeys.mentorshipRequests}reject/`, {
      method: "POST",
      body: JSON.stringify({ request_id: requestId }),
    });
    mutate();
  };
  return { trigger };
};

export const useUserMentees = () => {
  return useSWR(swrKeys.mentees, fetcher<IUser[]>);
};
