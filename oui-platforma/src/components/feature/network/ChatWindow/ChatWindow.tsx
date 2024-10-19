import {
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
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface IMessage {
  id: number;
  sender: string;
  content: string;
}

const messages: IMessage[] = [
  { id: 1, sender: "You", content: "Hello, how are you?" },
  { id: 2, sender: "Emily", content: "I'm good, thanks! How about you?" },
];

export const ChatWindow = ({ user, isOpen, onClose }: any) => {
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState<IMessage[]>(messages);
  const btnRef = useRef<HTMLButtonElement>(null);

  const sendMessage = () => {
    if (messageInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "You", content: messageInput, id: chatMessages.length + 1 },
      ]);
      setMessageInput("");
    }
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat with {user.username}</DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={4}>
              {chatMessages.map((msg, index) => (
                <Box key={index} w="full">
                  <Text fontWeight="bold">{msg.sender}:</Text>
                  <Text>{msg.content}</Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Flex w="full" align={"center"}>
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message"
              />
              <Button ml={2} onClick={sendMessage} variant={"dark"} p={5}>
                Send
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
