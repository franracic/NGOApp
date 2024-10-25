"use client";

import { mockUsers } from "@/components/feature/network/PTPSection/PTPSection";
import { IUser } from "@/typings/course";
import {
  Box,
  Flex,
  Heading,
  Link,
  Progress,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { MdEvent, MdLibraryBooks, MdPeople, MdSchool } from "react-icons/md";

interface DashboardIntroProps {
  user?: IUser;
  loading: boolean;
}

export const DashboardIntro = ({
  user = mockUsers[0],
  loading,
}: DashboardIntroProps) => {
  const textColor = "gray.800";
  const cardBg = "white";
  const textSecondary = "gray.400";
  const cardIconBg = "yellow.100";

  return (
    <Box h="auto" overflow="auto">
      <SkeletonText isLoaded={!loading} noOfLines={2} pb={4}>
        <Heading as="h1" size="lg" fontWeight="semibold" color={textColor}>
          Good afternoon, {user.name || user.username}
        </Heading>
      </SkeletonText>
      <SimpleGrid columns={{ base: 3, md: 6 }} spacing={4} mb={6}>
        <Box w="full" gridColumn={{ base: "span 3", md: "span 2" }}>
          <Skeleton isLoaded={!loading} borderRadius="2xl">
            <Box
              position="relative"
              overflow="hidden"
              bg={cardBg}
              shadow="lg"
              rounded="2xl"
            >
              <Link href={"/"}>
                <Flex align="center" justify="space-between" px={4} py={6}>
                  <Flex align="center">
                    <Box
                      position="relative"
                      p={3}
                      bg={cardIconBg}
                      rounded="full"
                    >
                      <MdSchool />
                    </Box>
                    <Text
                      ml={2}
                      fontSize="sm"
                      fontWeight="semibold"
                      color={textColor}
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      maxWidth="150px"
                    >
                      Level {user.level} {user.role}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={textColor}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                  >
                    {user.experiencePoints || 0}
                    <Text as="span" fontSize="xs" color={textSecondary}>
                      /1K points
                    </Text>
                  </Text>
                </Flex>
                <Progress
                  size="md"
                  colorScheme="yellow"
                  value={(user.experiencePoints || 0) / 10}
                />
              </Link>
            </Box>
          </Skeleton>
        </Box>

        <Box w="full">
          <Skeleton isLoaded={!loading} borderRadius="2xl">
            <Box
              position="relative"
              overflow="hidden"
              px={4}
              py={6}
              bg={cardBg}
              shadow="lg"
              rounded="2xl"
            >
              <Text fontSize="20px" fontWeight="bold" color={textColor}>
                {user.completed_courses_count || "No courses"}
              </Text>
              <Text
                fontSize="smaller"
                color={textSecondary}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                Completed Courses
              </Text>
              <Box
                position="absolute"
                p={2}
                bg={cardIconBg}
                rounded="full"
                top={2}
                right={4}
              >
                <MdSchool size="16px" />
              </Box>
            </Box>
          </Skeleton>
        </Box>

        <Box w="full" display={{ base: "none", md: "block" }}>
          <Skeleton isLoaded={!loading} borderRadius="2xl">
            <Box
              position="relative"
              overflow="hidden"
              px={4}
              py={6}
              bg={cardBg}
              shadow="lg"
              rounded="2xl"
            >
              <Text fontSize="20px" fontWeight="bold" color={textColor}>
                {user.connectionsCount || "No connections"}
              </Text>
              <Text
                fontSize="smaller"
                color={textSecondary}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                Connected Peers
              </Text>
              <Box
                position="absolute"
                p={2}
                bg={cardIconBg}
                rounded="full"
                top={2}
                right={4}
              >
                <MdPeople size="16px" />
              </Box>
            </Box>
          </Skeleton>
        </Box>

        <Box w="full">
          <Skeleton isLoaded={!loading} borderRadius="2xl">
            <Box
              position="relative"
              overflow="hidden"
              px={4}
              py={6}
              bg={cardBg}
              shadow="lg"
              rounded="2xl"
            >
              <Text fontSize="20px" fontWeight="bold" color={textColor}>
                3
              </Text>
              <Text
                fontSize="smaller"
                color={textSecondary}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                Recommended Resources
              </Text>
              <Box
                position="absolute"
                p={2}
                bg={cardIconBg}
                rounded="full"
                top={2}
                right={4}
              >
                <MdLibraryBooks size="16px" />
              </Box>
            </Box>
          </Skeleton>
        </Box>

        {user.isMentor && user.mentees && user.mentees.length > 0 && (
          <Box w="full">
            <Skeleton isLoaded={!loading} borderRadius="2xl">
              <Box
                position="relative"
                overflow="hidden"
                px={4}
                py={6}
                bg={cardBg}
                shadow="lg"
                rounded="2xl"
              >
                <Text fontSize="20px" fontWeight="bold" color={textColor}>
                  {user.mentees.length}
                </Text>
                <Text
                  fontSize="smaller"
                  color={textSecondary}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  Mentees
                </Text>
                <Box
                  position="absolute"
                  p={2}
                  bg={cardIconBg}
                  rounded="full"
                  top={2}
                  right={4}
                >
                  <MdPeople size="16px" />
                </Box>
              </Box>
            </Skeleton>
          </Box>
        )}

        <Box w="full">
          <Skeleton isLoaded={!loading} borderRadius="2xl">
            <Box
              position="relative"
              overflow="hidden"
              px={4}
              py={6}
              bg={cardBg}
              shadow="lg"
              rounded="2xl"
            >
              <Text fontSize="20px" fontWeight="bold" color={textColor}>
                {user.events ? user.events.length : "No events"}
              </Text>
              <Text
                fontSize="smaller"
                color={textSecondary}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                Upcoming Events
              </Text>
              <Box
                position="absolute"
                p={2}
                bg={cardIconBg}
                rounded="full"
                top={2}
                right={4}
              >
                <MdEvent size="16px" />
              </Box>
            </Box>
          </Skeleton>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
