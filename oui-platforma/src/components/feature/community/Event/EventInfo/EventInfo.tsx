"use client";
import { IEvent } from "@/typings/course";
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";

interface IAttendee {
  id: number;
  name: string;
}

const mockEvents: IEvent[] = [
  {
    id: 1,
    name: "React Webinar",
    date: new Date(),
    description: "A webinar about React basics.",
    attendees: 100,
    level: 3,
  },
  {
    id: 2,
    name: "CSS Workshop",
    date: new Date(),
    description: "Learn CSS from scratch.",
    attendees: 50,
    level: 2,
  },
];

const mockAttendees: IAttendee[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

export const EventInfo = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((evt) => evt.id === parseInt(id));
  const [attendees, setAttendees] = useState<IAttendee[]>(mockAttendees);
  const [isAttending, setIsAttending] = useState(false);

  const handleAttend = () => {
    const yourName = "Your Name";
    if (!attendees.find((attendee) => attendee.name === yourName)) {
      const newAttendee: IAttendee = {
        id: attendees.length + 1,
        name: yourName,
      };
      setAttendees([...attendees, newAttendee]);
      setIsAttending(true);
    }
  };

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"100%"}>
        <Heading size="xl" mb={4}>
          {event.name}
        </Heading>
        <Badge colorScheme="blue" mb={4}>
          {event.date.toDateString()}
        </Badge>
        <Divider mb={4} />
        <Text fontSize="lg" mb={8}>
          {event.description}
        </Text>
      </Card>
      <Divider my={4} />
      <VStack align="start">
        <Heading size="md">Attendees</Heading>
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <Card key={attendee.id} variant={"light"} w="full">
              <Text>{attendee.name}</Text>
            </Card>
          ))
        ) : (
          <Text color="gray.500">No attendees yet. Be the first to join!</Text>
        )}
      </VStack>
      <Button
        mt={4}
        variant="light"
        onClick={handleAttend}
        isDisabled={isAttending}
      >
        {isAttending ? "You are attending" : "Attend Event"}
      </Button>
    </Box>
  );
};
