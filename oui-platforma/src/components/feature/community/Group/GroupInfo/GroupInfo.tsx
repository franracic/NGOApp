"use client";

import { UserList } from "@/components/feature/user/UserList/UserList";
import { UserProfile } from "@/components/feature/user/UserProfile/UserProfile";
import { fetcher } from "@/fetchers/fetcher";
import {
  useConnections,
  useJoinGroup,
  useSendConnectionRequest,
} from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IDiscussion, IGroup } from "@/typings/course";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { MdCheck, MdPersonAdd } from "react-icons/md";
import useSWR from "swr";
import { GroupChat } from "../GroupChat/GroupChat";

export const GroupInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [activeDiscussion] = useState<IDiscussion | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isChatOpen, setChatOpen] = useState(false);

  const { data: connections } = useConnections();
  const { data: group, error } = useSWR(
    `${swrKeys.groups}${id}/`,
    fetcher<IGroup>
  );
  const { trigger: sendConnectionRequest } = useSendConnectionRequest();
  const toast = useToast();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const { trigger: triggerJoin } = useJoinGroup();
  const [isMember, setIsMember] = useState(group?.is_member);

  if (!group) {
    return <Text>Group not found</Text>;
  }
  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    onProfileOpen();
  };

  const isUserConnected = (userId: number): boolean => {
    if (!connections) return false;
    return connections.some((connection) => connection.id === userId);
  };

  const handleConnectionRequest = async (userId: number) => {
    try {
      await sendConnectionRequest(userId);
      toast({
        title: "Connection Request Sent",
        description: "Your connection request has been sent.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleJoin = async () => {
    try {
      await triggerJoin(group.id);
      setIsMember(true);
      toast({
        title: "Joined Group",
        description: `You have successfully joined the ${group.name} group.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to join the group:", error);
      toast({
        title: "Error",
        description: "Failed to join the group. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChatOpen = () => setChatOpen(true);
  const handleChatClose = () => setChatOpen(false);

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"full"} p={6} shadow="md">
        <Flex align="center" mb={6} gap={4}>
          <Avatar size="xl" src={group.logo_url} />
          <VStack align="start">
            <Heading size="xl">{group.name}</Heading>
            <Badge colorScheme="green">{group.members_count} Members</Badge>
          </VStack>
        </Flex>

        <Divider mb={4} />

        <Text fontSize="lg" mb={4}>
          {group.description}
        </Text>

        <Flex justifyContent="flex-end" gap={4}>
          <Tooltip label="Open Chat" aria-label="Open Chat">
            <IconButton
              icon={<FiMessageSquare />}
              aria-label="Open Chat"
              colorScheme="blue"
              onClick={handleChatOpen}
            />
          </Tooltip>

          <Tooltip
            label={isMember ? "Group joined" : "Join Group"}
            aria-label="Join Group"
          >
            {isMember ? (
              <IconButton
                icon={<MdCheck />}
                aria-label="Join Group"
                colorScheme="green"
                onClick={() => {}}
              />
            ) : (
              <IconButton
                icon={<MdPersonAdd />}
                aria-label="Join Group"
                colorScheme="green"
                onClick={handleJoin}
              />
            )}
          </Tooltip>
        </Flex>
      </Card>

      <Divider my={6} />

      <VStack align="start" mb={8} w="full">
        <Heading size="md" mb={4}>
          Group Members
        </Heading>
        {group.members?.length > 0 ? (
          <UserList users={group.members} onClick={handleUserClick} />
        ) : (
          <Text color="gray.500">No members found.</Text>
        )}
      </VStack>

      <Divider my={6} />

      <VStack align="start" w="full">
        <Heading size="md" mb={4}>
          Active Discussion
        </Heading>
        {activeDiscussion ? (
          <Card key={activeDiscussion.id} variant={"light"} w="full" mb={4}>
            <Text fontWeight="bold">{activeDiscussion.title}</Text>
            <Text fontSize="sm" color="gray.500">
              {activeDiscussion.author.name} -{" "}
              {activeDiscussion.timestamp.toLocaleString()}
            </Text>
            <Divider my={4} />
            <Text>{activeDiscussion.description}</Text>
          </Card>
        ) : (
          <Text color="gray.500">No active discussion available.</Text>
        )}
      </VStack>

      <GroupChat
        groupId={group.id}
        isOpen={isChatOpen}
        onClose={handleChatClose}
      />
      {selectedUser && (
        <UserProfile
          userId={selectedUser}
          isOpen={isProfileOpen}
          onClose={onProfileClose}
          onConnectionRequest={
            !isUserConnected(selectedUser) ? handleConnectionRequest : undefined
          }
        />
      )}
    </Box>
  );
};
