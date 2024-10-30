"use client";
import { Hero } from "@/components/core/Hero/Hero";
import Input from "@/components/shared/Input/Input";
import { fetcher } from "@/fetchers/fetcher";
import {
  useAvailableMentors,
  useSendMentorshipRequest,
  useUserMentees,
} from "@/fetchers/mentorship";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
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
import useSWR from "swr";
import { ChatWindow } from "../../network/ChatWindow/ChatWindow";
import { UserList } from "../../user/UserList/UserList";
import { UserProfile } from "../../user/UserProfile/UserProfile";
import { MenteeDashboard } from "../MentorDashboard/MentorDashboard";
import { MentorshipRequests } from "../MentorshipRequests/MentorshipRequests";

export const MentorshipSection = () => {
  const { data: user, isLoading: isUserLoading } = useSWR(
    swrKeys.currentUser,
    fetcher<IUser>
  );
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedMenteeId, setSelectedMenteeId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const {
    isOpen: isMenteeDashboardOpen,
    onOpen: openMenteeDashboard,
    onClose: closeMenteeDashboard,
  } = useDisclosure();
  const {
    isOpen: isOpenChat,
    onOpen: onOpenChat,
    onClose: onCloseChat,
  } = useDisclosure();

  const toast = useToast();

  const { data: mentors } = useAvailableMentors(searchQuery, currentPage);
  const { trigger: sendMentorshipRequest } = useSendMentorshipRequest();

  const { data: mentees } = useUserMentees();

  const { data: mentor } = useSWR(swrKeys.mentor, fetcher<IUser>);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleMentorshipRequest = async (mentorId: number) => {
    try {
      await sendMentorshipRequest(mentorId);
      toast({
        title: "Mentorship Request Sent",
        description: "Your mentorship request has been sent.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send mentorship request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUserClick = (userId: number) => {
    setSelectedUser(userId);
    onProfileOpen();
  };

  const handleMenteeClick = (userId: number) => {
    setSelectedMenteeId(userId);
    openMenteeDashboard();
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isUserLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex flexDirection={"column"} justifyContent="center" w={"full"}>
      {!user.mentor && !user.isMentor && (
        <Hero
          headingText="Mentorship"
          subheadingText="Guiding You Towards Success"
          bodyText="Connect with experienced professionals who can help you navigate your career and educational journey."
          img_url="https://www.gettingsmart.com/wp-content/uploads/2020/10/Mentorship-.jpg"
        />
      )}
      <Box mx="auto" mt={8} px={4} maxW="1600px" w={"full"}>
        {user.mentor && mentor && (
          <Flex mt={0} direction={{ base: "column", md: "row" }} gap={4}>
            <Box flex="1" maxW={{ base: "100%", md: "60%" }} maxH={"80vh"}>
              <ChatWindow userId={mentor.id} isInline />
            </Box>
            <Box flex="1" maxW={{ base: "100%", md: "40%" }}>
              <UserProfile userId={mentor.id} isInline />
            </Box>
          </Flex>
        )}

        {user.isMentor && (
          <>
            <MentorshipRequests onViewProfile={handleUserClick} />
            <Card p={4} variant={"light"}>
              <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
                Your Mentees
              </Text>
              {mentees && mentees.length > 0 ? (
                <UserList
                  users={mentees}
                  onClick={handleMenteeClick}
                  onMessageClick={(userId) => {
                    setSelectedMenteeId(userId);
                    onOpenChat();
                  }}
                />
              ) : (
                <Text textAlign="center">You have no mentees yet.</Text>
              )}
            </Card>
          </>
        )}

        {!user.mentor && !user.isMentor && (
          <>
            <Text fontSize="4xl" fontWeight="bold" mt={8} textAlign="center">
              Available Mentors
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
                  placeholder="Search mentors by name, job title, or interests"
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
                <UserList users={mentors || []} onClick={handleUserClick} />
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
                  disabled={!mentors || mentors.length === 0}
                >
                  Next
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Box>

      {selectedUser && isProfileOpen && (
        <UserProfile
          userId={selectedUser}
          isOpen={isProfileOpen}
          onClose={() => {
            setSelectedUser(null);
            onProfileClose();
          }}
          onConnectionRequest={handleMentorshipRequest}
        />
      )}

      {selectedMenteeId && (
        <>
          <ChatWindow
            userId={selectedMenteeId}
            onClose={onCloseChat}
            isOpen={isOpenChat}
          />
          <MenteeDashboard
            menteeId={selectedMenteeId}
            isOpen={isMenteeDashboardOpen}
            onClose={() => {
              setSelectedMenteeId(null);
              closeMenteeDashboard();
            }}
          />
        </>
      )}
    </Flex>
  );
};
