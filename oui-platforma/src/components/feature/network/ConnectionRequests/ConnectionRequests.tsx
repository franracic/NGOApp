import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const ConnectionRequests = ({ userId }: any) => {
  const [requests, setRequests] = useState([
    { id: 1, sender: "Alice", status: "pending" },
    { id: 2, sender: "Bob", status: "pending" },
  ]);

  const handleAccept = (requestId: any) => {
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  const handleReject = (requestId: any) => {
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  return (
    <Box p={4} border="1px solid" borderRadius="md" w="full">
      <Text fontSize="xl" mb={4}>
        Connection Requests
      </Text>
      <VStack spacing={4} align="start">
        {requests.map((request) => (
          <Box
            key={request.id}
            w="full"
            p={2}
            border="1px solid"
            borderRadius="md"
          >
            <Text fontWeight="bold">
              {request.sender} wants to connect with you
            </Text>
            <Button
              colorScheme="green"
              onClick={() => handleAccept(request.id)}
            >
              Accept
            </Button>
            <Button
              ml={2}
              colorScheme="red"
              onClick={() => handleReject(request.id)}
            >
              Reject
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
