"use client";
import { mockUsers } from "@/components/feature/network/PTPSection/PTPSection";
import { IResource } from "@/typings/course";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { MdLibraryBooks } from "react-icons/md";

const mockResources: IResource[] = [
  {
    id: 1,
    title: "Introduction to STEAM",
    link: "https://example.com/resource1",
    description: "A beginner's guide to integrating STEAM into classrooms.",
    level: 3,
    type: "Article",
    createdBy: mockUsers[0],
    createdAt: new Date(),
    tags: ["STEAM", "Education"],
  },
  {
    id: 2,
    title: "Growth Mindset Activities",
    link: "https://example.com/resource2",
    description: "Activities to help students develop a growth mindset.",
    level: 5,
    type: "Pdf",
    createdBy: mockUsers[1],
    createdAt: new Date(),
    tags: ["Growth Mindset", "Activities"],
  },
  {
    id: 3,
    title: "Hands-on Robotics",
    link: "https://example.com/resource3",
    description: "Projects to engage students in robotics.",
    level: 7,
    type: "Video",
    createdBy: mockUsers[2],
    createdAt: new Date(),
    tags: ["Robotics", "Hands-on"],
  },
];

export const CompactRecommendedResources = () => {
  const textColor = "gray.800";
  const textSecondary = "gray.400";

  return (
    <Box p={4} bg="white" shadow="sm" borderRadius="md" w="full">
      <Flex align="center" justify="space-between" pb={4}>
        <Flex align="center">
          <Box position="relative" p={3} bg="yellow.100" rounded="full">
            <MdLibraryBooks />
          </Box>
          <Text
            ml={2}
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            Recommended Resources
          </Text>
        </Flex>
      </Flex>

      <VStack spacing={4} align="start">
        {mockResources.length > 0 ? (
          mockResources.map((resource) => (
            <Box
              key={resource.id}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              rounded="md"
              shadow="sm"
              w="full"
            >
              <Flex align="center" justify="space-between">
                <Box>
                  <Link href={resource.link} isExternal>
                    <Text fontSize="sm" fontWeight="bold" color={textColor}>
                      {resource.title} - {resource.type}
                    </Text>
                  </Link>
                  <Text fontSize="xs" color={textSecondary}>
                    Level {resource.level} | Created by:{" "}
                    {resource.createdBy.name}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <Text fontSize="sm" color={textSecondary}>
            No resources found with the current filters.
          </Text>
        )}
      </VStack>
    </Box>
  );
};
