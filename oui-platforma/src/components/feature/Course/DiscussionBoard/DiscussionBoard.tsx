import { IUser } from "@/typings/course";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReply, FaThumbsUp } from "react-icons/fa";
import { generateMockUsers } from "../../network/GenerateMockUsers/GenerateMockUsers";

interface Comment {
  id: number;
  content: string;
  user: IUser;
  timestamp: string;
  replies: Comment[];
  likes: number;
}

// Mock users for demonstration purposes
const mockUsers: IUser[] = generateMockUsers(3);

// Initial mock comments
const initialComments: Comment[] = [
  {
    id: 1,
    content: "I really enjoyed this course so far!",
    user: mockUsers[0],
    timestamp: new Date().toLocaleString(),
    replies: [],
    likes: 2,
  },
  {
    id: 2,
    content: "Does anyone have suggestions on how to implement this?",
    user: mockUsers[1],
    timestamp: new Date().toLocaleString(),
    replies: [
      {
        id: 3,
        content: "I would recommend starting with a small project.",
        user: mockUsers[2],
        timestamp: new Date().toLocaleString(),
        replies: [],
        likes: 1,
      },
    ],
    likes: 3,
  },
];

export const DiscussionBoard: React.FC<{ currentUser: IUser }> = ({
  currentUser,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState<string>("");

  const handleAddComment = () => {
    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      user: currentUser,
      timestamp: new Date().toLocaleString(),
      replies: [],
      likes: 0,
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                content: newReply,
                user: currentUser,
                timestamp: new Date().toLocaleString(),
                replies: [],
                likes: 0,
              },
            ],
          }
        : comment
    );
    setComments(updatedComments);
    setReplyTo(null);
    setNewReply("");
  };

  const handleLikeComment = (commentId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    setComments(updatedComments);
  };

  return (
    <Box mt={1}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button mt={2} onClick={handleAddComment} variant={"light"}>
            Post Comment
          </Button>
        </Box>
        <Divider />
        {comments.map((comment) => (
          <Box
            key={comment.id}
            border="1px"
            borderColor="gray.300"
            p={4}
            borderRadius="md"
          >
            <HStack align="start">
              <Avatar name={comment.user.username} src={comment.user.avatar} />
              <Box>
                <HStack justify="space-between" w="full">
                  <Text fontWeight="bold">{comment.user.username}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {comment.timestamp}
                  </Text>
                </HStack>
                <Text mt={2}>{comment.content}</Text>
                <HStack mt={4} spacing={4}>
                  <IconButton
                    icon={<FaThumbsUp />}
                    aria-label="Like comment"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    variant="ghost"
                  />
                  <Text fontSize="sm">
                    {comment.likes} {comment.likes === 1 ? "Like" : "Likes"}
                  </Text>
                  <IconButton
                    icon={<FaReply />}
                    aria-label="Reply to comment"
                    size="sm"
                    onClick={() => setReplyTo(comment.id)}
                    variant="ghost"
                  />
                </HStack>
                {replyTo === comment.id && (
                  <Box mt={2} ml={8}>
                    <Textarea
                      placeholder="Add a reply..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                    <Button
                      mt={2}
                      onClick={() => handleAddReply(comment.id)}
                      variant={"light"}
                    >
                      Post Reply
                    </Button>
                  </Box>
                )}
                {comment.replies.length > 0 && (
                  <VStack
                    mt={4}
                    pl={4}
                    borderLeft="2px"
                    borderColor="gray.300"
                    align="stretch"
                  >
                    {comment.replies.map((reply) => (
                      <Box
                        key={reply.id}
                        p={2}
                        bg={"gray.100"}
                        borderRadius="md"
                      >
                        <HStack align="start">
                          <Avatar
                            name={reply.user.username}
                            src={reply.user.avatar}
                            size="sm"
                          />
                          <Box>
                            <HStack justify="space-between" w="full">
                              <Text fontWeight="bold">
                                {reply.user.username}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {reply.timestamp}
                              </Text>
                            </HStack>
                            <Text mt={2}>{reply.content}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
