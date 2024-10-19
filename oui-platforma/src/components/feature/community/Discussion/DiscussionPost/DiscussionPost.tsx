import { IDiscussion } from "@/typings/course";
import { Card, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const DiscussionPost = ({ discussion }: { discussion: IDiscussion }) => {
  return (
    <Card
      p={4}
      w="full"
      as={NextLink}
      href={`/networking/discussion/${discussion.id}`}
    >
      <Text fontSize="xl" fontWeight="bold">
        {discussion.title}
      </Text>
      <Text fontSize="sm" color="gray.500">
        By {discussion.author} on {discussion.timestamp.toLocaleString()}
      </Text>
      <Text mt={4}>{discussion.content}</Text>
    </Card>
  );
};
