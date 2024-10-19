"use client";

import { IUser } from "@/typings/course";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import {
  FaAward,
  FaCalendarAlt,
  FaCertificate,
  FaComments,
  FaLightbulb,
  FaMedal,
  FaPeopleArrows,
  FaPuzzlePiece,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { ShortenedTrophyCard } from "./AchievementTooltip";

const mockTrophies = [
  {
    id: 1,
    title: "Profile Completed",
    description: "Completed 100% of your profile.",
    icon: FaMedal,
    progress: 100,
    isEarned: true,
  },
  {
    id: 2,
    title: "5 Years of Experience",
    description: "Marked 5 years in your current field.",
    icon: FaTrophy,
    progress: 80,
    isEarned: false,
  },
  {
    id: 3,
    title: "Top Contributor",
    description: "Recognized as a top contributor in the community.",
    icon: FaAward,
    progress: 60,
    isEarned: false,
  },
  {
    id: 4,
    title: "Certified Professional",
    description: "Earned a professional certification.",
    icon: FaCertificate,
    progress: 40,
    isEarned: false,
  },
  {
    id: 5,
    title: "Team Player",
    description: "Collaborated with 5 or more peers.",
    icon: FaPeopleArrows,
    progress: 70,
    isEarned: false,
  },
  {
    id: 6,
    title: "Event Attendee",
    description: "Participated in 3 events.",
    icon: FaCalendarAlt,
    progress: 50,
    isEarned: false,
  },
  {
    id: 7,
    title: "Continuous Learner",
    description: "Completed 5 learning modules.",
    icon: FaLightbulb,
    progress: 20,
    isEarned: false,
  },
  {
    id: 8,
    title: "Community Mentor",
    description: "Provided guidance to 3 mentees.",
    icon: FaUserFriends,
    progress: 90,
    isEarned: false,
  },
  {
    id: 9,
    title: "Problem Solver",
    description: "Solved 50 community challenges.",
    icon: FaPuzzlePiece,
    progress: 30,
    isEarned: false,
  },
  {
    id: 10,
    title: "Feedback Champion",
    description: "Gave constructive feedback to 10 peers.",
    icon: FaComments,
    progress: 80,
    isEarned: false,
  },
];

interface AchievementsNearCompletionProps {
  user?: IUser;
  loading: boolean;
}

export const AchievementsNearCompletion = ({
  user,
  loading,
}: AchievementsNearCompletionProps) => {
  const textColor = "gray.800";
  const cardBg = "white";
  const textSecondary = "gray.400";

  const achievementsNearCompletion = (mockTrophies || user?.trophies || [])
    .filter(
      (achievement) => !achievement.isEarned && achievement.progress >= 50
    )
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 2);

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
      <Flex align="center" justify="space-between" px={4} pt={6} pb={2}>
        <Flex align="start">
          <Skeleton isLoaded={!loading}>
            <Box position="relative" p={3} bg="yellow.100" rounded="full">
              <MdLibraryBooks size="16px" />
            </Box>
          </Skeleton>
          <Box ml={2}>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="15px" fontWeight="bold" color={textColor}>
                Achievements Near Completion
              </Text>
            </SkeletonText>
            <SkeletonText isLoaded={!loading} noOfLines={1}>
              <Text fontSize="smaller" color={textSecondary}>
                You're almost there, keep going!
              </Text>
            </SkeletonText>
          </Box>
        </Flex>
      </Flex>

      <HStack spacing={4} px={4} pb={4} align="start">
        {loading ? (
          <>
            <Skeleton height="100px" width="100px" rounded="md" />
            <Skeleton height="100px" width="100px" rounded="md" />
          </>
        ) : achievementsNearCompletion.length > 0 ? (
          achievementsNearCompletion.map((achievement) => (
            <ShortenedTrophyCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
              progress={achievement.progress}
            />
          ))
        ) : (
          <Text color={textSecondary} fontSize="sm">
            No achievements close to completion. Keep progressing!
          </Text>
        )}
      </HStack>
    </Box>
  );
};
