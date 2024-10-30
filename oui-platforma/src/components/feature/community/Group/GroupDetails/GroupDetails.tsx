"use client";

import { useJoinGroup, useLeaveGroup } from "@/fetchers/networking";
import { IGroup } from "@/typings/course";
import {
  Avatar,
  Box,
  Card,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdExitToApp, MdGroupAdd } from "react-icons/md";

export const GroupDetails = ({ group }: { group: IGroup }) => {
  const [isMember, setIsMember] = useState(group.is_member);
  const router = useRouter();
  const toast = useToast();

  const { trigger: triggerJoin } = useJoinGroup();
  const { trigger: triggerLeave } = useLeaveGroup();

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

  const handleLeave = async () => {
    try {
      await triggerLeave(group.id);
      setIsMember(false);
      toast({
        title: "Left Group",
        description: `You have successfully left the ${group.name} group.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to leave the group:", error);
      toast({
        title: "Error",
        description: "Failed to leave the group. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <NextLink href={`/networking/group/${group.id}`} passHref>
      <Card
        p={6}
        shadow="md"
        borderRadius="md"
        w="full"
        as="a"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
      >
        <Flex align="center" gap={4}>
          <Avatar size="lg" src={group.logo_url} />
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {group.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {group.members_count} Members
            </Text>
          </Box>
        </Flex>

        <Text mt={4} fontSize="md" color="gray.700">
          {group.description}
        </Text>

        <Flex mt={6} justify="flex-end" align="center" gap={2}>
          {isMember ? (
            <Tooltip label="Leave Group" aria-label="Leave Group">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  handleLeave();
                }}
                icon={<MdExitToApp />}
                aria-label="Leave Group"
                variant="outline"
                colorScheme="red"
              />
            </Tooltip>
          ) : (
            <Tooltip label="Join Group" aria-label="Join Group">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  handleJoin();
                }}
                icon={<MdGroupAdd />}
                aria-label="Join Group"
                colorScheme="green"
              />
            </Tooltip>
          )}
        </Flex>
      </Card>
    </NextLink>
  );
};
