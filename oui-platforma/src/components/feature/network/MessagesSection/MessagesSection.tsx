// import {
//   Avatar,
//   Box,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   Text,
//   useColorModeValue,
//   VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { MdSend } from "react-icons/md";
// import { mockUsers } from "../PTPSection/PTPSection";

// interface IMessage {
//   from: string;
//   text: string;
// }

// const initialMessages: Map<string, IMessage[]> = new Map([
//   [
//     "1",
//     [
//       { from: "me", text: "Hi Alice!" },
//       { from: "Alice", text: "Hello! How are you?" },
//     ],
//   ],
//   [
//     "2",
//     [
//       { from: "me", text: "Hey Bob, what’s up?" },
//       { from: "Bob", text: "All good, how about you?" },
//     ],
//   ],
//   [
//     "3",
//     [
//       { from: "me", text: "Hi Charlie!" },
//       { from: "Charlie", text: "Hi! Long time no see." },
//     ],
//   ],
// ]);

// export const MessagesSection = () => {
//   const [selectedUserId, setSelectedUserId] = useState<string>("1");
//   const [messages, setMessages] =
//     useState<Map<string, IMessage[]>>(initialMessages);
//   const [newMessage, setNewMessage] = useState<string>("");

//   const handleUserSelect = (userId: string) => {
//     setSelectedUserId(userId);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages((prevMessages) => {
//         const updatedMessages = new Map(prevMessages);
//         const userMessages = updatedMessages.get(selectedUserId) || [];
//         updatedMessages.set(selectedUserId, [
//           ...userMessages,
//           { from: "me", text: newMessage.trim() },
//         ]);
//         return updatedMessages;
//       });
//       setNewMessage("");
//     }
//   };

//   return (
//     <Flex height="100vh">
//       <Box
//         width={{ base: "100%", md: "25%" }}
//         borderRight={{ base: "none", md: "1px" }}
//         borderColor={useColorModeValue("gray.200", "gray.700")}
//         p={4}
//         overflowY="auto"
//       >
//         <VStack align="stretch" spacing={4}>
//           {mockUsers.map((user) => (
//             <HStack
//               key={user.id}
//               p={3}
//               borderRadius="md"
//               bg={
//                 parseInt(selectedUserId) === user.id
//                   ? "yellow.100"
//                   : "transparent"
//               }
//               cursor="pointer"
//               _hover={{ bg: "yellow.200" }}
//               onClick={() => handleUserSelect(user.id.toString())}
//             >
//               <Avatar name={user.username} src={user.avatar} />
//               <Text>{user.username}</Text>
//             </HStack>
//           ))}
//         </VStack>
//       </Box>

//       <Flex direction="column" flex={1} p={4}>
//         <Box flex={1} overflowY="auto" mb={4}>
//           {messages.get(selectedUserId)?.map((message, index) => (
//             <Box
//               key={index}
//               alignSelf={message.from === "me" ? "flex-end" : "flex-start"}
//               bg={message.from === "me" ? "blue.100" : "gray.100"}
//               color={message.from === "me" ? "black" : "inherit"}
//               p={3}
//               borderRadius="md"
//               mb={2}
//               maxWidth="70%"
//             >
//               <Text>{message.text}</Text>
//             </Box>
//           )) || <Text>No messages yet</Text>}
//         </Box>

//         <HStack spacing={4}>
//           <Input
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSendMessage();
//             }}
//           />
//           <IconButton
//             icon={<MdSend />}
//             aria-label="Send message"
//             colorScheme="blue"
//             onClick={handleSendMessage}
//             isDisabled={!newMessage.trim()}
//           />
//         </HStack>
//       </Flex>
//     </Flex>
//   );
// };
