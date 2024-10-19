import { IEvent, IGroup, IResource, IUser } from "@/typings/course";
import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  recommendConnections,
  recommendEvents,
  recommendGroups,
  recommendResources,
} from "../RecommendationFunctions/RecommendationFunctions";

interface RecommendationsProps {
  user: IUser;
  users: IUser[];
  groups: IGroup[];
  resources: IResource[];
  events: IEvent[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  user,
  users,
  groups,
  resources,
  events,
}) => {
  const recommendedConnections = recommendConnections(user, users);
  const recommendedGroups = recommendGroups(user, groups);
  const recommendedResources = recommendResources(user, resources);
  const recommendedEvents = recommendEvents(user, events);

  return (
    <VStack align="start" spacing={6}>
      <Box>
        <Heading size="lg" mb={4}>
          Recommended Connections
        </Heading>
        {recommendedConnections.map((connection) => (
          <Text key={connection.id}>
            {connection.username} - Level {connection.level}
          </Text>
        ))}
      </Box>

      <Box>
        <Heading size="lg" mb={4}>
          Recommended Groups
        </Heading>
        {recommendedGroups.map((group) => (
          <Text key={group.id}>
            {group.name} - {group.description}
          </Text>
        ))}
      </Box>

      <Box>
        <Heading size="lg" mb={4}>
          Recommended Resources
        </Heading>
        {recommendedResources.map((resource) => (
          <HStack key={resource.id}>
            <Link href={resource.link} isExternal>
              {resource.title}
            </Link>
            <Text>- {resource.description}</Text>
          </HStack>
        ))}
      </Box>

      <Box>
        <Heading size="lg" mb={4}>
          Recommended Events
        </Heading>
        {recommendedEvents.map((event) => (
          <Text key={event.id}>
            {event.name} - {event.description} (Level {event.level})
          </Text>
        ))}
      </Box>
    </VStack>
  );
};
