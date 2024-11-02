"use client";

import { useNotifications } from "@/fetchers/notification";
import {
  Badge,
  Box,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FaCheckCircle } from "react-icons/fa";

interface ActivityFeedProps {
  loading: boolean;
}

export const RecommendedActivity = ({ loading }: ActivityFeedProps) => {
  const { data: activities } = useNotifications();

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="white"
      shadow="lg"
      rounded="2xl"
      w="full"
      h="full"
      maxH={"50%"}
    >
      <Flex align="center" justify="space-between" px={4} py={4}>
        <Flex align="start">
          <Skeleton isLoaded={!loading}>
            <Box position="relative" p={3} bg="yellow.100" rounded="full">
              <FaCheckCircle size="16px" color="green.500" />
            </Box>
          </Skeleton>
          <Box ml={2}>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                Recent Activity
              </Text>
            </SkeletonText>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="xs" color="gray.400">
                Check out your latest notifications
              </Text>
            </SkeletonText>
          </Box>
        </Flex>
      </Flex>
      <Box px={4} py={2} overflowY="auto" maxH="300px">
        {loading ? (
          <>
            <SkeletonText noOfLines={2} spacing="4" mb={2} />
            <SkeletonText noOfLines={2} spacing="4" mb={2} />
            <SkeletonText noOfLines={2} spacing="4" />
          </>
        ) : activities && activities.length > 0 ? (
          <List spacing={4}>
            {activities.slice(0, 5).map((activity, index) => (
              <ListItem key={index}>
                <HStack justify="space-between" align="start">
                  <HStack align="start">
                    <ListIcon as={FaCheckCircle} color="green.500" mt={1} />
                    <VStack align="start" spacing={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color="gray.800"
                      >
                        {activity.message}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {activity.sender_username
                          ? `From: ${activity.sender_username}`
                          : "System Notification"}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack align="end" spacing={0}>
                    <Badge colorScheme={activity.is_read ? "gray" : "green"}>
                      {activity.is_read ? "Read" : "Unread"}
                    </Badge>
                    <Text fontSize="xs" color="gray.400">
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
          <Text fontSize="sm" color="gray.500">
            No recent activities found
          </Text>
        )}
      </Box>
    </Box>
  );
};
