"use client";

import { addComment } from "@/fetchers/comments";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IComment, IUser } from "@/typings/course";
import {
  Box,
  Button,
  Divider,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CommentItem } from "./CommentItem";

export const DiscussionBoard = ({
  courseId,
  discussionId,
  commentIds,
}: {
  courseId?: number;
  discussionId?: number;
  commentIds: number[];
}) => {
  const toast = useToast();
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(
    swrKeys.multipleComments,
    () =>
      fetcher<IComment[]>(swrKeys.multipleComments, {
        method: "POST",
        body: JSON.stringify({ ids: commentIds }),
      }),
    { refreshInterval: 2000 }
  );

  const { trigger: triggerAddComment } = useSWRMutation(
    swrKeys.comments,
    async (key, { arg }: { arg: { content: string } }) => {
      addComment(arg.content, courseId, discussionId);
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Comment Added",
          description: "Your comment has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        mutate(swrKeys.comments);
        mutate(swrKeys.multipleComments);
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to add comment. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add a comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (newComment.trim()) {
      triggerAddComment({ content: newComment });
      setNewComment("");
      mutate(swrKeys.comments);
    }
  };

  if (error) return <Text>Error loading comments</Text>;
  if (isLoading) return <Spinner />;

  return (
    <Box mt={1} w={"full"}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button mt={2} onClick={handleAddComment} variant="light">
            Post Comment
          </Button>
        </Box>
        <Divider />
        {comments && currentUser && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
            />
          ))
        ) : (
          <Text>No comments available</Text>
        )}
      </VStack>
    </Box>
  );
};
