"use client";
import { IDiscussion } from "@/typings/course";
import {
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IComment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

const mockDiscussions: IDiscussion[] = [
  {
    id: 1,
    title: "Integrating Arts into STEAM",
    author: "Emily Carter",
    content:
      "What are the best strategies for integrating arts into a STEAM curriculum?",
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "Promoting Growth Mindset in Classrooms",
    author: "Laura White",
    content: "How do you encourage a growth mindset among your students?",
    timestamp: new Date(),
  },
];

const mockComments: IComment[] = [
  {
    id: 1,
    author: "Sarah Thompson",
    content:
      "Project-based learning has been very effective for integrating arts into STEAM.",
    timestamp: new Date(),
  },
  {
    id: 2,
    author: "Michael Lee",
    content:
      "For growth mindset, I often start with classroom discussions and reflection activities.",
    timestamp: new Date(),
  },
];

export const DiscussionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const discussion = mockDiscussions.find((disc) => disc.id === parseInt(id));
  const [comments, setComments] = useState<IComment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>("");

  if (!discussion) {
    return <Text>Discussion not found</Text>;
  }

  const handleAddComment = () => {
    const comment: IComment = {
      id: comments.length + 1,
      author: "Current User",
      content: newComment,
      timestamp: new Date(),
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"full"}>
        <Heading size="xl" mb={4}>
          {discussion.title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={4}>
          By {discussion.author} on {discussion.timestamp.toLocaleString()}
        </Text>
        <Divider mb={4} />
        <Text fontSize="lg" mb={8}>
          {discussion.content}
        </Text>
      </Card>
      <Divider my={4} />
      <VStack align="start">
        <Heading size="md">Comments</Heading>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card variant={"light"} key={comment.id} w="full">
              <Text fontWeight="bold">{comment.author}</Text>
              <Text fontSize="sm" color="gray.500">
                {comment.timestamp.toLocaleString()}
              </Text>
              <Text mt={2}>{comment.content}</Text>
            </Card>
          ))
        ) : (
          <Text color="gray.500">
            No comments yet. Be the first to comment!
          </Text>
        )}
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          mt={4}
        />
        <Button onClick={handleAddComment} variant={"light"} mt={2}>
          Submit Comment
        </Button>
      </VStack>
    </Box>
  );
};
