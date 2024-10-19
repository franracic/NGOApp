import { IEvent } from "@/typings/course";
import { Card, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const EventDetails = ({ event }: { event: IEvent }) => {
  return (
    <Card p={4} w={"100%"} as={NextLink} href={`/networking/event/${event.id}`}>
      <Text fontSize="xl" fontWeight="bold">
        {event.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {event.date.toDateString()}
      </Text>
      <Text mt={4}>{event.description}</Text>
      <Text mt={4} fontSize="sm" color="gray.500">
        {event.attendees} Attendees
      </Text>
    </Card>
  );
};
