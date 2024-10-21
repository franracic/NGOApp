import { ICourseContent, ICourseSection } from "@/typings/course";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { CourseProgress } from "../CourseProgress/CourseProgress";

interface CourseContentSidebarProps {
  courseSections: ICourseSection[];
  selectedContent: ICourseContent;
  setSelectedContent: (content: ICourseContent) => void;
}

export const CourseContentSidebar: React.FC<CourseContentSidebarProps> = ({
  courseSections,
  selectedContent,
  setSelectedContent,
}) => {
  return (
    <Box
      flex="1"
      p={4}
      bg={useColorModeValue("gray.100", "gray.900")}
      overflowY="auto"
      borderLeft="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Heading as="h3" size="lg" mb={4}>
        Course Content
      </Heading>
      <CourseProgress courseSections={courseSections} />
      {courseSections.map((section, sectionIdx) => (
        <Box key={sectionIdx} mb={6}>
          <Heading as="h4" size="md" mb={2}>
            {section.title}
          </Heading>
          <VStack align="stretch">
            {section.contents.map((content, contentIdx) => (
              <HStack
                key={contentIdx}
                as={Button}
                onClick={() => setSelectedContent(content)}
                variant="ghost"
                justifyContent="space-between"
                alignItems="center"
                textAlign="left"
                w={"100%"}
                py={2}
                px={4}
                bg={
                  selectedContent.id === content.id
                    ? "yellowLight"
                    : "transparent"
                }
                _hover={{ bg: "gray.200" }}
              >
                <Text flex="1">{content.title}</Text>
                {content.duration && (
                  <Text fontSize="sm" color="gray.500" flexShrink={0}>
                    {content.duration}
                  </Text>
                )}
                {content.is_completed ? (
                  <FaCheckCircle color="green.500" />
                ) : null}
              </HStack>
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );
};
