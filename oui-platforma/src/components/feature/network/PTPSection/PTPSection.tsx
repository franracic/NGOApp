"use client";
import { Hero } from "@/components/core/Hero/Hero";
import Input from "@/components/shared/Input/Input";
import { IActivity, IUser } from "@/typings/course";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  HStack,
  SlideFade,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { mockUserList } from "../../Course/courseMock/usersMock";
import { UserCard } from "../../user/UserCard/UserCard";
import { UserList } from "../../user/UserList/UserList";
import { UserProfile } from "../../user/UserProfile/UserProfile";
import { ActivityFeed } from "../ActivityFeed/ActivityFeed";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import { Leaderboard } from "../Leaderboard/Leaderboard";

export const mockUsers = mockUserList;

export const mockActivities: IActivity[] = [
  {
    id: 1,
    userId: "2",
    username: "Jane Doe",
    action: "connected with",
    target: "John Doe",
    timestamp: new Date(),
  },
  {
    id: 2,
    userId: "1",
    username: "John Doe",
    action: "completed a challenge",
    target: "30 Days of Code",
    timestamp: new Date(),
  },
  {
    id: 3,
    userId: "3",
    username: "Alice",
    action: "shared a resource",
    target: "React Best Practices",
    timestamp: new Date(),
  },
];

export const PTPSection = () => {
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const USERS_PER_PAGE = 4;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardHeight, setCardHeight] = useState<string>("auto");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleConnectionRequest = (user: IUser) => {
    if (!connectedUsers.some((u) => u.id === user.id)) {
      setConnectedUsers([...connectedUsers, user]);
    }
  };

  const filteredUsers = mockUsers
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery) ||
        user.jobTitle.toLowerCase().includes(searchQuery) ||
        user.city.toLowerCase().includes(searchQuery) ||
        user.country.toLowerCase().includes(searchQuery) ||
        user.interests?.some((interest) =>
          interest.toLowerCase().includes(searchQuery)
        )
    )
    .sort((a, b) => {
      if (a.country === "Croatia" && b.country !== "Croatia") {
        return -1;
      } else if (a.country !== "Croatia" && b.country === "Croatia") {
        return 1;
      } else {
        return a.country.localeCompare(b.country);
      }
    });

  const startIndex = currentPage * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handleNextPage = () => {
    if (startIndex + USERS_PER_PAGE < filteredUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const heights = cardRefs.current.map(
      (ref) => ref?.getBoundingClientRect().height || 0
    );
    const maxHeight = Math.max(...heights);
    setCardHeight(`${maxHeight}px`);
  }, [paginatedUsers]);

  return (
    <Flex flexDirection={"column"} justifyContent="center">
      <Hero
        headingText="Collaborate & Innovate"
        subheadingText="Empowering Youth Mentors"
        bodyText="Join a vibrant community of youth workers sharing insights and experiences."
        img_url="https://cdn.b12.io/client_media/gksrF78w/7919db7e-54be-11ef-9fe1-0242ac110002-photo-1517048676732-d65bc937f952.jpg"
      />
      <Box mx="auto" mt={8} px={4} maxW="1200px">
        <Text fontSize="4xl" fontWeight="bold" mb={8} textAlign="center">
          Meet Your Peers
        </Text>
        <Grid templateColumns={isSmallerThan768 ? "1fr" : "1fr 3fr"} gap={8}>
          <UserProfile
            user={filteredUsers[selectedUser]}
            onConnect={handleConnectionRequest}
          />
          <Box>
            <Card
              mb={4}
              justify="space-between"
              align="center"
              flexDirection={"row"}
              p={2}
            >
              <Input
                placeholder="Search peers by name, job title, or interests"
                width="80%"
                borderColor={useColorModeValue("gray.300", "gray.700")}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="solid" colorScheme="yellow">
                Search
              </Button>
            </Card>
            <SlideFade in key={currentPage}>
              <UserList
                users={paginatedUsers}
                onClick={setSelectedUser}
                onMessageClick={onOpen}
                cardRefs={cardRefs}
                cardHeight={cardHeight}
              />
            </SlideFade>
            <HStack justifyContent="center" mt={4}>
              <Button
                onClick={handlePreviousPage}
                variant={"light"}
                isDisabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                variant={"light"}
                isDisabled={startIndex + USERS_PER_PAGE >= filteredUsers.length}
              >
                Next
              </Button>
            </HStack>
          </Box>
        </Grid>

        <Card mt={8} p={4} _hover={{ transform: 1 }}>
          <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
            Connected Users
          </Text>
          <Grid
            templateColumns={isSmallerThan768 ? "1fr" : "repeat(4, 1fr)"}
            gap={6}
          >
            {connectedUsers.length > 0 ? (
              connectedUsers.map((user) => (
                <UserCard key={user.id} user={user} onMessageClick={onOpen} />
              ))
            ) : (
              <Text fontSize="lg" textAlign="center">
                You haven&apos;t connected with anyone yet.
              </Text>
            )}
          </Grid>
        </Card>
        <Card mt={8} p={4} _hover={{ transform: 1 }}>
          <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
            Recent Activity of connected users
          </Text>
          <ActivityFeed activities={mockActivities} />
        </Card>
      </Box>
      <Leaderboard users={mockUsers} criterion="experiencePoints" />
      <Leaderboard users={mockUsers} criterion="activityLevel" />
      <Leaderboard users={mockUsers} criterion="connectionsCount" />
      <ChatWindow
        user={filteredUsers[selectedUser]}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Flex>
  );
};
