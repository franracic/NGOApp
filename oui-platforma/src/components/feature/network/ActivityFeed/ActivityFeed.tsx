import { IActivity } from "@/typings/course";
import { Box, Text, VStack } from "@chakra-ui/react";

export const ActivityFeed = ({ activities }: { activities: IActivity[] }) => {
  return (
    <Box p={4} borderRadius="md" w="full">
      <VStack spacing={4} align="start">
        {activities.map((activity) => (
          <Box key={activity.id} w="full" p={2} borderRadius="md">
            <Text fontWeight="bold">
              {activity.username} {activity.action} {activity.target}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {activity.timestamp.toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
