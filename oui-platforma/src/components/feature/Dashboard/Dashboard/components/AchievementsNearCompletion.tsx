"use client";

import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ITrophy } from "@/typings/course";
import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { MdLibraryBooks } from "react-icons/md";
import useSWR from "swr";
import { ShortenedTrophyCard } from "./AchievementTooltip";

export const AchievementsNearCompletion = () => {
  const { data: trophies, error } = useSWR(
    swrKeys.trophyTemplates,
    fetcher<ITrophy[]>
  );

  const textColor = "gray.800";
  const cardBg = "white";
  const textSecondary = "gray.400";

  if (error) return <div>Error loading data.</div>;
  if (!trophies) return <div>Loading...</div>;

  const achievementsNearCompletion = trophies
    .filter((trophy) => !trophy.is_earned)
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
          <Skeleton isLoaded={!!trophies}>
            <Box position="relative" p={3} bg="yellow.100" rounded="full">
              <MdLibraryBooks size="16px" />
            </Box>
          </Skeleton>
          <Box ml={2}>
            <SkeletonText isLoaded={!!trophies} noOfLines={1}>
              <Text fontSize="15px" fontWeight="bold" color={textColor}>
                Achievements Near Completion
              </Text>
            </SkeletonText>
            <SkeletonText isLoaded={!!trophies} noOfLines={1}>
              <Text fontSize="smaller" color={textSecondary}>
                You&apos;re almost there, keep going!
              </Text>
            </SkeletonText>
          </Box>
        </Flex>
      </Flex>

      <HStack spacing={4} px={4} pb={4} align="start">
        {achievementsNearCompletion.length > 0 ? (
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
