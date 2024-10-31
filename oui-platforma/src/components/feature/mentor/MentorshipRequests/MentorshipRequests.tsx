"use client";
import {
  useAcceptMentorshipRequest,
  useMentorshipRequests,
  useRejectMentorshipRequest,
} from "@/fetchers/mentorship";
import {
  Avatar,
  Button,
  Card,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export const MentorshipRequests = ({
  onViewProfile,
}: {
  onViewProfile: (userId: number) => void;
}) => {
  const { data: requests, mutate } = useMentorshipRequests();
  const { trigger: acceptRequest } = useAcceptMentorshipRequest();
  const { trigger: rejectRequest } = useRejectMentorshipRequest();
  const toast = useToast();

  const handleAccept = async (requestId: number) => {
    try {
      await acceptRequest(requestId);
      toast({
        title: "Mentorship Request Accepted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept mentorship request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await rejectRequest(requestId);
      toast({
        title: "Mentorship Request Rejected",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject mentorship request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!requests || requests.length === 0) {
    return null;
  }

  return (
    <Card p={4} my={8} variant={"light"}>
      <Text fontSize="xl" mb={4}>
        Mentorship Requests
      </Text>
      <VStack spacing={4} align="start">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id} p={4} w="full">
              <HStack justifyContent="space-between" w="full">
                <HStack>
                  <Avatar src={request.sender.avatar} />
                  <Text fontWeight="bold">{request.sender.username}</Text>
                </HStack>
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => onViewProfile(request.sender.id)}
                >
                  View Profile
                </Button>
              </HStack>
              <HStack mt={2} spacing={2}>
                <Button
                  colorScheme="green"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
              </HStack>
            </Card>
          ))
        ) : (
          <Text>No new mentorship requests.</Text>
        )}
      </VStack>
    </Card>
  );
};
