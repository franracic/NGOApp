"use client";
import { DiscussionBoard } from "@/components/feature/Course/DiscussionBoard/DiscussionBoard";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IDiscussion } from "@/typings/course";
import {
  Box,
  Card,
  Divider,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const DiscussionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: discussion, error } = useSWR(
    `${swrKeys.discussions}${id}/`,
    fetcher<IDiscussion>,
    { refreshInterval: 10000 }
  );

  if (error) return <Text>Error loading discussion</Text>;
  if (!discussion) return <Spinner />;

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"full"}>
        <Heading size="xl" mb={4}>
          {discussion.title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          By {discussion.author.username} on{" "}
          {new Date(discussion.timestamp).toLocaleString()}
        </Text>
        <Divider mb={4} />
        <Text fontSize="lg" mb={8}>
          {discussion.description}
        </Text>
      </Card>
      <Divider my={4} />
      <VStack align="start">
        <Heading size="md">Comments</Heading>
        <DiscussionBoard
          discussionId={discussion.id}
          commentIds={discussion.comments}
        />
      </VStack>
    </Box>
  );
};
