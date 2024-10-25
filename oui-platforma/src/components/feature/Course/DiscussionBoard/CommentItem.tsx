"use client";

import { AlertDialogComponent } from "@/components/shared/AlertDialog/AlertDialog";
import {
  addReply,
  deleteComment,
  editComment,
  likeComment,
} from "@/fetchers/comments";
import { swrKeys } from "@/fetchers/swrKeys";
import { IComment, IUser } from "@/typings/course";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEdit, FaReply, FaThumbsUp, FaTrash } from "react-icons/fa";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface CommentItemProps {
  comment: IComment;
  currentUser: IUser;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUser,
}) => {
  const toast = useToast();
  const [newReply, setNewReply] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedComment, setEditedComment] = useState<string>(comment.content);
  const [showReply, setShowReply] = useState<boolean>(false);
  const [isEditingReply, setIsEditingReply] = useState<number | null>(null);
  const [editedReplyContent, setEditedReplyContent] = useState<string>("");

  const { trigger: triggerAddReply } = useSWRMutation(
    swrKeys.comment(comment.id) + "reply/",
    async (key, { arg }: { arg: { content: string } }) =>
      addReply(comment.id, arg.content),
    {
      onSuccess: (data) => {
        toast({
          title: "Reply Added",
          description: "Your reply has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        mutate(swrKeys.comments);
        setShowReply(false);
        setNewReply("");
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to add reply. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const { trigger: triggerLike } = useSWRMutation(
    swrKeys.comment(comment.id) + "like/",
    async () => likeComment(comment.id),
    {
      onSuccess: (data) => {
        const isLiked = data?.status === "liked";
        mutate(
          swrKeys.comments,
          (currentComments: IComment[] | undefined) =>
            currentComments?.map((c) =>
              c.id === comment.id
                ? {
                    ...c,
                    likes_count: isLiked
                      ? c.likes_count + 1
                      : c.likes_count - 1,
                    is_liked: isLiked,
                  }
                : c
            ),
          false
        );
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to like/unlike comment. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const { trigger: triggerEditComment } = useSWRMutation(
    (id: number) => swrKeys.comment(id),
    async (key, { arg }: { arg: { content: string; id: number } }) =>
      editComment(arg.id, arg.content),
    {
      onSuccess: (data) => {
        toast({
          title: "Comment Updated",
          description: "Your comment has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsEditing(false);
        setIsEditingReply(null);
        mutate(swrKeys.comments);
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to edit comment. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const { trigger: triggerDeleteComment } = useSWRMutation(
    (id: number) => swrKeys.comment(id),
    async (key, { arg }: { arg: { id: number } }) => deleteComment(arg.id),
    {
      onSuccess: () => {
        toast({
          title: "Comment Deleted",
          description: "Your comment has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        mutate(swrKeys.comments);
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to delete comment. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleAddReply = () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to add a reply.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (newReply.trim()) {
      triggerAddReply({ content: newReply });
    }
  };

  const handleEditComment = () => {
    triggerEditComment({ content: editedComment, id: comment.id });
  };

  const handleDeleteComment = () => {
    triggerDeleteComment({ id: comment.id });
  };

  const handleLikeComment = () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to like a comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    triggerLike();
  };

  const handleEditReply = (replyId: number, content: string) => {
    triggerEditComment({ content, id: replyId });
  };

  const handleDeleteReply = (replyId: number) => {
    triggerDeleteComment({ id: replyId });
  };

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      p={4}
      borderRadius="md"
      bg="gray.50"
    >
      <HStack align="start">
        <Avatar name={comment.user.username} src={comment.user.avatar} />
        <Box flex="1">
          <HStack justify="space-between" w="full">
            <Text fontWeight="bold">{comment.user.username}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(comment.timestamp).toLocaleString()}
            </Text>
          </HStack>

          {isEditing ? (
            <Box mt={2}>
              <Textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <Button mt={2} onClick={handleEditComment} colorScheme="blue">
                Save
              </Button>
              <Button
                mt={2}
                onClick={() => setIsEditing(false)}
                colorScheme="gray"
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Text mt={2}>{comment.content}</Text>
          )}

          <HStack mt={4} spacing={4}>
            <IconButton
              icon={<FaThumbsUp />}
              aria-label="Like comment"
              size="sm"
              onClick={handleLikeComment}
              variant="ghost"
              colorScheme={comment.is_liked ? "blue" : "gray"}
            />
            <Text fontSize="sm">
              {comment.likes_count}{" "}
              {comment.likes_count === 1 ? "Like" : "Likes"}
            </Text>
            <IconButton
              icon={<FaReply />}
              aria-label="Reply to comment"
              size="sm"
              onClick={() => setShowReply(!showReply)}
              variant="ghost"
            />
            {comment.user.id === currentUser.id && (
              <>
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit comment"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  variant="ghost"
                />
                <AlertDialogComponent
                  buttonIcon={<FaTrash />}
                  alertTitle="Delete Comment"
                  alertBody="Are you sure you want to delete this comment?"
                  onConfirm={handleDeleteComment}
                />
              </>
            )}
          </HStack>

          {showReply && (
            <Box mt={2} ml={8}>
              <Textarea
                placeholder="Add a reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <Button mt={2} onClick={handleAddReply} variant="dark">
                Post Reply
              </Button>
            </Box>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <VStack
              mt={4}
              pl={4}
              borderLeft="2px"
              borderColor="gray.300"
              align="stretch"
              spacing={4}
            >
              {comment.replies.map((reply) => (
                <Box key={reply.id} p={2} bg={"gray.100"} borderRadius="md">
                  <HStack align="start">
                    <Avatar
                      name={reply.user.username}
                      src={reply.user.avatar}
                      size="sm"
                    />
                    <Box flex="1">
                      <HStack justify="space-between" w="full">
                        <Text fontWeight="bold">{reply.user.username}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {new Date(reply.timestamp).toLocaleString()}
                        </Text>
                      </HStack>
                      <Text mt={2}>{reply.content}</Text>
                      {reply.user.id === currentUser.id && (
                        <HStack spacing={2} mt={2}>
                          <IconButton
                            icon={<FaEdit />}
                            aria-label="Edit reply"
                            size="sm"
                            onClick={() =>
                              setIsEditingReply(
                                isEditingReply === reply.id ? null : reply.id
                              )
                            }
                            variant="ghost"
                          />
                          <AlertDialogComponent
                            buttonIcon={<FaTrash />}
                            alertTitle="Delete Reply"
                            alertBody="Are you sure you want to delete this reply?"
                            onConfirm={() => handleDeleteReply(reply.id)}
                          />
                        </HStack>
                      )}
                    </Box>
                  </HStack>
                  {isEditingReply === reply.id && (
                    <Box mt={2}>
                      <Textarea
                        value={editedReplyContent}
                        onChange={(e) => setEditedReplyContent(e.target.value)}
                      />
                      <Button
                        mt={2}
                        onClick={() =>
                          handleEditReply(reply.id, editedReplyContent)
                        }
                        colorScheme="blue"
                      >
                        Save
                      </Button>
                      <Button
                        mt={2}
                        onClick={() => setIsEditingReply(null)}
                        colorScheme="gray"
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
};
