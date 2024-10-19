import { swrKeys } from "@/fetchers/swrKeys";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useUserRegistration = () => {
  const { data, error, mutate } = useSWR(swrKeys.register, fetcher);

  const registerUser = async (userData: any) => {
    try {
      await axios.post(swrKeys.register, userData);
      mutate();
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    registerUser,
  };
};
