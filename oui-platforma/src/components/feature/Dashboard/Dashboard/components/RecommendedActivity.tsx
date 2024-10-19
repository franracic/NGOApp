"use client";

import { IUser } from "@/typings/course";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdEvent } from "react-icons/md";

interface IActivity {
  level: number;
  title: string;
  description: string;
}

const activityList: IActivity[] = [
  {
    level: 1,
    title: "Introduction to Coding",
    description: "Beginner coding workshop",
  },
  {
    level: 2,
    title: "STEAM Education Basics",
    description: "Learn STEAM fundamentals",
  },
  {
    level: 3,
    title: "Growth Mindset Activities",
    description: "Hands-on activities for growth mindset",
  },
  {
    level: 4,
    title: "Robotics 101",
    description: "Introduction to building simple robots",
  },
  {
    level: 5,
    title: "Intermediate Python Programming",
    description: "Advance your Python skills",
  },
  {
    level: 6,
    title: "Project-Based Learning Bootcamp",
    description: "Intensive bootcamp for project-based learning",
  },
  {
    level: 7,
    title: "Advanced Robotics",
    description: "Building advanced robotics projects",
  },
  {
    level: 8,
    title: "Experiential Learning Conference",
    description: "Join experiential learning sessions",
  },
  {
    level: 9,
    title: "STEAM Leadership Program",
    description: "Lead STEAM initiatives in your community",
  },
  {
    level: 0,
    title: "Tech Community Hackathon",
    description: "Collaborate in a 48-hour hackathon",
  },
];
interface RecommendedActivityProps {
  user?: IUser;
  loading: boolean;
}

export const RecommendedActivity = ({
  user,
  loading,
}: RecommendedActivityProps) => {
  const textColor = "gray.800";
  const cardBg = "white";
  const textSecondary = "gray.400";

  const recommendedActivities = activityList.filter(
    (activity) => activity.level <= (user?.level ?? 0)
  );

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={cardBg}
      shadow="lg"
      rounded="2xl"
      w="full"
      h="full"
    >
      <Flex align="center" justify="space-between" px={4} py={4}>
        <Flex align="start">
          <Skeleton isLoaded={!loading}>
            <Box position="relative" p={3} bg="yellow.100" rounded="full">
              <MdEvent size="16px" />
            </Box>
          </Skeleton>
          <Box ml={2}>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                Recommended Activities
              </Text>
            </SkeletonText>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="xs" color={textSecondary}>
                Join upcoming events and activities
              </Text>
            </SkeletonText>
          </Box>
        </Flex>
      </Flex>
      <VStack align="start" px={4} py={2} spacing={2}>
        {loading ? (
          <>
            <SkeletonText noOfLines={2} spacing="4" />
            <SkeletonText noOfLines={2} spacing="4" />
            <SkeletonText noOfLines={2} spacing="4" />
          </>
        ) : (
          recommendedActivities.slice(0, 3).map((activity, index) => (
            <Box key={index}>
              <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                {activity.title}
              </Text>
              <Text fontSize="xs" color={textSecondary}>
                {activity.description}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
