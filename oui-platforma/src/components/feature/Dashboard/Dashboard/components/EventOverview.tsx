"use client";
import { mockEvents } from "@/components/feature/community/Event/EventList/EventList";
import { IEvent } from "@/typings/course";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { MdEvent } from "react-icons/md";

export const CompactEventOverview = () => {
  const textColor = "gray.800";
  const textSecondary = "gray.400";

  return (
    <Box p={2} bg="white" shadow="sm" borderRadius="md" w="full">
      <Flex align="center" justify="space-between" px={4} py={6}>
        <Flex align="center">
          <Box position="relative" p={3} bg="yellow.100" rounded="full">
            <MdEvent />
          </Box>
          <Text
            ml={2}
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            Upcoming Events
          </Text>
        </Flex>
      </Flex>
      {mockEvents.slice(0, 2).map((event: IEvent) => (
        <Link key={event.id} href={`/events/${event.id}`} isExternal>
          <Text px={4} py={2} fontSize="sm" color={textSecondary} isTruncated>
            {event.name} - {event.date.toLocaleDateString()}
          </Text>
        </Link>
      ))}
    </Box>
  );
};
