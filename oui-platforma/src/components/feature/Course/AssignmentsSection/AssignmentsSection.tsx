import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";

export const AssignmentsSection: React.FC = () => {
  return (
    <Box mt={4}>
      <Heading size="md" mb={4}>
        Assignments
      </Heading>
      <List spacing={3}>
        <ListItem>Assignment 1: Build a Personal Portfolio</ListItem>
        <ListItem>Assignment 2: Create a To-Do List App using React</ListItem>
        <ListItem>Assignment 3: Design a Landing Page using CSS Grid</ListItem>
      </List>
    </Box>
  );
};
