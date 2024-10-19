// MentorshipCard.tsx
import { IUser } from "@/typings/course";
import { Box, Card, Heading, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

interface MentorshipCardProps {
  user: IUser;
}

export const MentorshipCard: React.FC<MentorshipCardProps> = ({ user }) => {
  if (!user.isMentor) return null;

  return (
    <Card gap={8} p={4}>
      <Heading as="h2" size="md">
        Mentorship
      </Heading>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          Mentees
        </Text>
        <List spacing={3}>
          {user.mentees && user.mentees.length > 0 ? (
            user.mentees.map((mentee, index) => (
              <ListItem key={index}>{mentee.name}</ListItem>
            ))
          ) : (
            <Text fontSize="sm" color="gray.400">
              No mentees assigned yet.
            </Text>
          )}
        </List>
      </Box>
    </Card>
  );
};
