import { IActivity } from "@/typings/course";
import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ActivityFeedProps {
  activities?: IActivity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  if (!activities) {
    return <Text>No recent activities</Text>;
  }
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Recent Activity
      </Text>
      <List spacing={3}>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <ListIcon as={FaCheckCircle} color="yellowDark" />
            {activity.action}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
