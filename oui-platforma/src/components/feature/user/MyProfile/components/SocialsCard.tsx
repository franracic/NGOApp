import { IUser } from "@/typings/course";
import { Box, Card, Heading, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

interface SocialsCardProps {
  user: IUser;
}

export const SocialsCard: React.FC<SocialsCardProps> = ({ user }) => {
  return (
    <Card gap={8} p={4}>
      <Heading as="h2" size="md">
        Socials
      </Heading>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          Connected Peers
        </Text>
        <List spacing={3}>
          {user.connectionsCount && user.connectionsCount > 0 ? (
            [...Array(user.connectionsCount)].map((_, index) => (
              <ListItem key={index}>Connected Peer {index + 1}</ListItem>
            ))
          ) : (
            <Text fontSize="sm" color="gray.400">
              No connections yet.
            </Text>
          )}
        </List>
      </Box>
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Groups
        </Text>
        <List spacing={3}>
          {user.groups ? (
            user.groups?.map((group, index) => (
              <ListItem key={index}>{group.name}</ListItem>
            ))
          ) : (
            <Text fontSize="sm" color="gray.400">
              No groups yet.
            </Text>
          )}
        </List>
      </Box>
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Events
        </Text>
        <List spacing={3}>
          {user.events ? (
            user.events?.map((event, index) => (
              <ListItem key={index}>{event.name}</ListItem>
            ))
          ) : (
            <Text fontSize="sm" color="gray.400">
              No events yet.
            </Text>
          )}
        </List>
      </Box>
    </Card>
  );
};
