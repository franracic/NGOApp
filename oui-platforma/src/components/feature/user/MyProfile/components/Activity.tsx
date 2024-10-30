import { useNotifications } from "@/fetchers/notification";
import {
  Badge,
  Card,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";

export const ActivityFeed = () => {
  const { data: activities } = useNotifications();

  if (!activities) {
    return <Text>No recent activities</Text>;
  }
  const recentActivities = activities.slice(0, 15);

  return (
    <Card p={4} overflow={"auto"} maxH={"100vh"}>
      <Heading as="h2" size="md" mb={2}>
        Recent Activity
      </Heading>
      {recentActivities.length > 0 ? (
        <List spacing={4}>
          {recentActivities.map((activity, index) => (
            <ListItem
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              overflow={"hidden"}
            >
              <HStack justify="space-between">
                <HStack>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <VStack align="start">
                    <Text fontSize="md" fontWeight="semibold">
                      {activity.message}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {activity.sender_username
                        ? `From: ${activity.sender_username}`
                        : "System Notification"}
                    </Text>
                  </VStack>
                </HStack>
                <VStack align="end">
                  <Badge colorScheme={activity.is_read ? "gray" : "green"}>
                    {activity.is_read ? "Read" : "Unread"}
                  </Badge>
                  <Text fontSize="sm" color="gray.400">
                    {formatDistanceToNow(new Date(activity.created_at), {
                      addSuffix: true,
                    })}
                  </Text>
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No recent activities found</Text>
      )}
    </Card>
  );
};
