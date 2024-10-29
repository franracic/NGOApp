"use client";
import { Hero } from "@/components/core/Hero/Hero";
import Input from "@/components/shared/Input/Input";
import {
  useConnections,
  useSendConnectionRequest,
  useUsers,
} from "@/fetchers/networking";
import {
  Box,
  Button,
  Card,
  Flex,
  SlideFade,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UserList } from "../../user/UserList/UserList";
import { UserProfile } from "../../user/UserProfile/UserProfile";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import { ConnectionRequests } from "../ConnectionRequests/ConnectionRequests";

export const PTPSection = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const toast = useToast();

  const { data: users } = useUsers(searchQuery, currentPage);
  const { data: connections } = useConnections();
  const { trigger: sendConnectionRequest } = useSendConnectionRequest();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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

  const isUserConnected = (userId: number): boolean => {
    if (!connections) return false;
    return connections.some((connection) => connection.id === userId);
  };

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    onProfileOpen();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (!users) {
    return null;
  }

  const filteredUsers = users.filter((user) => !isUserConnected(user.id));

  return (
    <Flex flexDirection={"column"} justifyContent="center" w={"full"}>
      <Hero
        headingText="Collaborate & Innovate"
        subheadingText="Empowering Youth Mentors"
        bodyText="Join a vibrant community of youth workers sharing insights and experiences."
        img_url="https://cdn.b12.io/client_media/gksrF78w/7919db7e-54be-11ef-9fe1-0242ac110002-photo-1517048676732-d65bc937f952.jpg"
      />
      <Box mx="auto" mt={8} px={4} maxW="1600px" w={"full"}>
        <ConnectionRequests onViewProfile={handleUserClick}/>

        <Card mt={8} p={4} variant={"light"}>
          <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
            Connected Users
          </Text>
          {connections && connections.length > 0 ? (
            <UserList
              users={connections}
              onMessageClick={(userId) => {
                setSelectedUser(userId);
                onOpen();
              }}
              onClick={handleUserClick}
            />
          ) : (
            <Text fontSize="lg" textAlign="center">
              You haven&apos;t connected with anyone yet.
            </Text>
          )}
        </Card>

        <Text fontSize="4xl" fontWeight="bold" mt={8} textAlign="center">
          Meet Your Peers
        </Text>

        <Box>
          <Card
            mb={4}
            justify="space-between"
            align="center"
            flexDirection={"row"}
            variant={"light"}
            p={2}
          >
            <Input
              placeholder="Search peers by name, job title, or interests"
              width="90%"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button
              variant="solid"
              colorScheme="yellow"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </Button>
          </Card>
          <SlideFade in>
            <UserList users={filteredUsers || []} onClick={handleUserClick} />
          </SlideFade>
          <Flex justifyContent="center" mt={4}>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={!filteredUsers || filteredUsers.length === 0}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Box>

      {selectedUser && (
        <ChatWindow userId={selectedUser} onClose={onClose} isOpen={isOpen} />
      )}

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
    </Flex>
  );
};
