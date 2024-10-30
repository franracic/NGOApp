"use client";
import { fetcher } from "@/fetchers/fetcher";
import { newDiscussions } from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IDiscussion, IUser } from "@/typings/course";
import { SimpleGrid, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { DiscussionPost } from "../DiscussionPost/DiscussionPost";
import { NewDiscussionForm } from "../NewDiscussionForm/NewDiscussionForm";

export const DiscussionList = () => {
  const {
    data: discussions,
    error,
    mutate,
  } = useSWR(swrKeys.discussions, fetcher<IDiscussion[]>);
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const toast = useToast();
  const [newDiscussion, setNewDiscussion] = useState<Partial<IDiscussion>>({});

  const { trigger } = useSWRMutation(swrKeys.discussions, async () => {
    await newDiscussions(newDiscussion);
  });

  if (error) return <Text>Error loading discussions</Text>;
  if (!discussions) return <Spinner />;

  const addDiscussion = async (newDiscussion: Partial<IDiscussion>) => {
    setNewDiscussion(newDiscussion);
    try {
      await trigger();
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add discussion.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8}>
      {(currentUser?.role === "admin" || currentUser?.role === "mentor") && (
        <NewDiscussionForm addDiscussion={addDiscussion} />
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} w={"full"}>
        {discussions.map((discussion) => (
          <DiscussionPost key={discussion.id} discussion={discussion} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
