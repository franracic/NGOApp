import { IEvent } from "@/typings/course";
import { Badge, Card, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const EventDetails = ({ event }: { event: IEvent }) => {
  return (
    <Card p={4} w={"100%"} as={NextLink} href={`/networking/event/${event.id}`}>
      <Text fontSize="xl" fontWeight="bold">
        {event.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {new Date(event.date).toLocaleString()}
      </Text>
      <Text mt={4}>{event.description}</Text>
      {event.tags && event.tags.length > 0 && (
        <Badge colorScheme="teal" mt={2}>
          {event.tags.join(", ")}
        </Badge>
      )}
      <Text mt={4} fontSize="sm" color="gray.500">
        {event.attendees_count} Attendees
      </Text>
    </Card>
  );
};
