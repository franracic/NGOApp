"use client";

import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse, IUser } from "@/typings/course";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import { CourseList } from "../../courses/CourseList/CourseList";
import { AchievementsNearCompletion } from "./components/AchievementsNearCompletion";
import { DashboardIntro } from "./components/DashboarIntro";
import { RecommendedActivity } from "./components/RecommendedActivity";

export const Dashboard = () => {
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useSWR(swrKeys.currentUser, fetcher<IUser>);

  const {
    data: courses,
    error: coursesError,
    isLoading: isCoursesLoading,
  } = useSWR(swrKeys.courses, fetcher<ICourse[]>);

  if (userError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error:</AlertTitle>
        <AlertDescription>
          Failed to load user data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const unCompletedCourses =
    courses?.sort((a, b) => Number(a.is_completed) - Number(b.is_completed)) ||
    [];

  return (
    <Box position="relative" w="full">
      <Flex direction="column" px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }}>
        <DashboardIntro user={user} loading={isUserLoading} />
        {coursesError && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>
              Failed to load courses. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        <Flex direction={{ base: "column", lg: "row" }} gap={6} w="full">
          <Box w={{ base: "100%", lg: "70%" }}>
            <CourseList
              courses={unCompletedCourses}
              loading={isCoursesLoading}
              maxCourses={3}
            />
          </Box>
          <Box w={{ base: "100%", lg: "30%" }}>
            <VStack spacing={6} align="stretch" h={"full"}>
              <RecommendedActivity user={user} loading={isUserLoading} />
              <AchievementsNearCompletion user={user} loading={isUserLoading} />
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
