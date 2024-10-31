"use client";
import { UserList } from "@/components/feature/user/UserList/UserList";
import { UserProfile } from "@/components/feature/user/UserProfile/UserProfile";
import { fetcher } from "@/fetchers/fetcher";
import {
  useAttendEvent,
  useConnections,
  useSendConnectionRequest,
  useUnattendEvent,
} from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IEvent, IUser } from "@/typings/course";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export const EventInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const {
    data: event,
    error,
    mutate,
  } = useSWR(`${swrKeys.events}${id}/`, fetcher<IEvent>);
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const { data: connections } = useConnections();
  const { trigger: sendConnectionRequest } = useSendConnectionRequest();
  const toast = useToast();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

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

  const attendMutation = useAttendEvent();
  const unattendMutation = useUnattendEvent();

  const isAttending = event?.attendees.some(
    (user) => user.id === currentUser?.id
  );

  const handleAttend = async () => {
    try {
      if (isAttending) {
        await unattendMutation.trigger(parseInt(id));
        toast({
          title: "Event",
          description: "You are no longer attending this event.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await attendMutation.trigger(parseInt(id));
        toast({
          title: "Event",
          description: "You are now attending this event.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      mutate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (error) return <Text>Error loading event</Text>;
  if (!event) return <Spinner />;

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"100%"} mb={4}>
        <Heading size="xl" mb={4}>
          {event.name}
        </Heading>
        <Badge colorScheme="blue" mb={4}>
          {new Date(event.date).toLocaleString()}
        </Badge>
        <Divider mb={4} />
        <Text fontSize="lg" mb={8}>
          {event.description}
        </Text>
        {event.tags && event.tags.length > 0 && (
          <VStack align="start" spacing={2}>
            <Heading size="sm">Tags</Heading>
            <Wrap>
              {event.tags.map((tag, index) => (
                <WrapItem key={index}>
                  <Badge colorScheme="teal">{tag}</Badge>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        )}
      </Card>

      <Button onClick={handleAttend} variant="solid" colorScheme="teal">
        {isAttending ? "Cancel Attendance" : "Attend Event"}
      </Button>

      <Divider my={8} />

      <VStack align="start" spacing={4}>
        <Heading size="md">Attendees</Heading>
        {event.attendees && event.attendees.length > 0 ? (
          <UserList users={event.attendees} onClick={handleUserClick} />
        ) : (
          <Text color="gray.500">No attendees yet. Be the first to join!</Text>
        )}
      </VStack>

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
