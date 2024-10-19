"use client";
import { mockActivities } from "@/components/feature/network/PTPSection/PTPSection";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { MdUpdate } from "react-icons/md";

export const CompactRecentActivities = () => {
  const textColor = "gray.800";
  const textSecondary = "gray.400";

  return (
    <Box p={2} bg="white" shadow="sm" borderRadius="md" w="full">
      <Flex align="center" justify="space-between" px={4} py={6}>
        <Flex align="center">
          <Box position="relative" p={3} bg="yellow.100" rounded="full">
            <MdUpdate />
          </Box>
          <Text
            ml={2}
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            Recent Activities
          </Text>
        </Flex>
      </Flex>
      <VStack spacing={1} px={4} py={2} align="start">
        {mockActivities.slice(0, 3).map((activity) => (
          <Text
            key={activity.id}
            fontSize="xs"
            color={textSecondary}
            isTruncated
          >
            {activity.username} {activity.action} {activity.target}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};
