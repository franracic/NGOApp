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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import { CourseList } from "../../courses/CourseList/CourseList";
import { DashboardIntro } from "../../Dashboard/Dashboard/components/DashboarIntro";

interface MenteeDashboardProps {
  menteeId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MenteeDashboard = ({
  menteeId,
  isOpen,
  onClose,
}: MenteeDashboardProps) => {
  const {
    data: mentee,
    error,
    isLoading,
  } = useSWR(
    menteeId ? swrKeys.MenteeDashboard(menteeId) : null,
    fetcher<IUser>
  );

  const {
    data: courses,
    error: coursesError,
    isLoading: isCoursesLoading,
  } = useSWR(swrKeys.courses, fetcher<ICourse[]>);

  if (!menteeId || !mentee) {
    return null;
  }

  const filteredCourses =
    courses?.filter((course) => mentee.courses?.includes(course.id)) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>
                Failed to load mentee&apos;s data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <Box w="full">
              <Flex
                direction="column"
                px={{ base: 2, md: 4 }}
                py={{ base: 2, md: 4 }}
              >
                <DashboardIntro
                  user={mentee}
                  loading={isLoading}
                  greeting={`${mentee.name}'s Dashboard`}
                />
                <CourseList
                  courses={filteredCourses}
                  loading={isLoading}
                  maxCourses={3}
                />
              </Flex>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
