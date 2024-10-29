import { fetcher } from "@/fetchers/fetcher";
import { useMessages, useSendMessage } from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IMessage, IUser } from "@/typings/course";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiSend } from "react-icons/fi"; // Import the Send arrow icon
import useSWR from "swr";

interface IMessageGroup {
  sender: IUser;
  messages: IMessage[];
}

export const ChatWindow = ({
  userId,
  isOpen,
  onClose,
}: {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: messages, mutate } = useMessages(userId);
  const { trigger: sendMessage } = useSendMessage();
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const toast = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      try {
        await sendMessage({
          recipient_id: userId,
          content: messageInput,
        });
        setMessageInput("");
        mutate();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessages = (messages: IMessage[]): IMessageGroup[] => {
    const groups: IMessageGroup[] = [];
    let lastSenderId: number | null = null;
    let currentGroup: IMessageGroup | null = null;

    messages?.forEach((msg) => {
      if (msg.sender.id !== lastSenderId) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = {
          sender: msg.sender,
          messages: [msg],
        };
        lastSenderId = msg.sender.id;
      } else {
        currentGroup!.messages.push(msg);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const filteredMessages = messages?.filter((msg) =>
    DOMPurify.sanitize(msg.content)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const messageGroups = groupMessages(filteredMessages || []);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent display="flex" flexDirection="column">
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex justify="space-between" align="center">
            <Text>Chat</Text>
            <IconButton
              mr={4}
              aria-label="Search"
              icon={<FiSearch />}
              onClick={() => setShowSearch(!showSearch)}
              variant="ghost"
            />
          </Flex>

          {showSearch && (
            <InputGroup mt={2}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          )}
        </DrawerHeader>

        <DrawerBody flex="1" overflowY="auto">
          <VStack align="stretch" spacing={4}>
            {messageGroups.map((group, index) => (
              <MessageGroup
                key={index}
                group={group}
                isCurrentUser={group.sender.id === currentUser?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Flex w="full" align="center" position="relative">
            <Button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              variant="ghost"
              mr={2}
            >
              😊
            </Button>
            {showEmojiPicker && (
              <Box position="absolute" bottom="60px" zIndex={1000}>
                <EmojiPicker
                  onEmojiClick={(emoji: EmojiClickData) =>
                    setMessageInput((prev) => prev + emoji.emoji)
                  }
                />
              </Box>
            )}
            <Box flex="1">
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message"
              />
            </Box>
            <Button
              onClick={handleSendMessage}
              variant="solid"
              ml={2}
              bg="yellow.400"
            >
              <FiSend size={20} />
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface MessageGroupProps {
  group: IMessageGroup;
  isCurrentUser: boolean;
}

const MessageGroup = ({ group, isCurrentUser }: MessageGroupProps) => {
  return (
    <Flex
      flexDirection="column"
      alignItems={isCurrentUser ? "flex-end" : "flex-start"}
    >
      {!isCurrentUser && (
        <Flex alignItems="center" mb={1}>
          <Avatar
            size="sm"
            src={group.sender.avatar || ""}
            name={group.sender.username}
            mr={2}
          />
          <Text fontWeight="bold">{group.sender.username}</Text>
        </Flex>
      )}
      {group.messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isCurrentUser={isCurrentUser}
        />
      ))}
    </Flex>
  );
};

interface MessageBubbleProps {
  message: IMessage;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  const sanitizedContent = DOMPurify.sanitize(message.content);

  return (
    <Box
      bg={isCurrentUser ? "blue.500" : "gray.200"}
      color={isCurrentUser ? "white" : "black"}
      borderRadius="lg"
      p={3}
      mt={1}
      maxWidth="70%"
      alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
    >
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        style={{ wordWrap: "break-word" }}
      />
    </Box>
  );
};
