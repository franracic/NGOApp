import { ICourseSection } from "@/typings/course";
import { Box, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";

interface CourseProgressProps {
  courseSections: ICourseSection[];
  completedVideos: Set<string>;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  courseSections,
  completedVideos,
}) => {
  const totalContents = courseSections.reduce(
    (acc, section) => acc + section.contents.length,
    0
  );
  const completedCount = courseSections.reduce(
    (acc, section) =>
      acc +
      section.contents.filter((content) => completedVideos.has(content.title))
        .length,
    0
  );
  const completionPercentage = (completedCount / totalContents) * 100;

  return (
    <Box p={4} textAlign="center">
      <Text fontWeight="bold" mb={2}>
        Course Progress: {Math.round(completionPercentage)}%
      </Text>
      <CircularProgress
        value={completionPercentage}
        size="100px"
        color="yellowDark"
        trackColor="gray.200"
      />
    </Box>
  );
};
