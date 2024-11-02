// src/components/peer-to-peer/ConnectionRequests.tsx

import {
  useAcceptConnectionRequest,
  useConnectionRequests,
  useRejectConnectionRequest,
} from "@/fetchers/networking";
import {
  Avatar,
  Button,
  Card,
  HStack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

export const ConnectionRequests = ({
  onViewProfile,
}: {
  onViewProfile: (userId: number) => void;
}) => {
  const { data: requests, mutate } = useConnectionRequests();
  const { trigger: acceptRequest } = useAcceptConnectionRequest();
  const { trigger: rejectRequest } = useRejectConnectionRequest();
  const toast = useToast();

  const handleAccept = async (requestId: number) => {
    try {
      await acceptRequest(requestId);
      toast({
        title: "Connection Accepted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate(); // Refresh connection requests
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept connection request.",
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
        title: "Connection Rejected",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      mutate(); // Refresh connection requests
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject connection request.",
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
    <Card p={4} mt={8} variant={"light"}>
      <Text fontSize="xl" mb={4}>
        Connection Requests
      </Text>
      <VStack spacing={4} align="start">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id} p={4} minW={"40%"}>
              <HStack justifyContent="space-between" w="full" gap={4}>
                <HStack>
                  <Avatar src={request.sender.avatar} />
                  <Text fontWeight="bold">{request.sender.name}</Text>
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
          <Text>No new connection requests.</Text>
        )}
      </VStack>
    </Card>
  );
};
