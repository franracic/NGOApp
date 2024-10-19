import {
  Box,
  Card,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FaBook, FaGlobe, FaVideo } from "react-icons/fa";

export interface Resource {
  name: string;
  description: string;
  link: string;
  icon: IconType;
}

const resources: Resource[] = [
  {
    name: "STEAM Education Resources",
    description:
      "Comprehensive resources for integrating STEAM into classrooms.",
    link: "https://www.steameducation.org/resources",
    icon: FaBook,
  },
  {
    name: "Growth Mindset Toolkit",
    description:
      "Tools and strategies for fostering a growth mindset in students.",
    link: "https://www.mindsetworks.com/resources",
    icon: FaBook,
  },
  {
    name: "Project-Based Learning Guide",
    description:
      "Best practices and resources for implementing project-based learning.",
    link: "https://www.pblworks.org/resources",
    icon: FaGlobe,
  },
  {
    name: "Edutopia - Experiential Learning",
    description: "Articles and videos on experiential learning techniques.",
    link: "https://www.edutopia.org/topic/experiential-learning",
    icon: FaBook,
  },
  {
    name: "TED Talks - Education",
    description:
      "Inspirational talks on education and innovative teaching methods.",
    link: "https://www.ted.com/topics/education",
    icon: FaVideo,
  },
  {
    name: "YouTube - STEAM Activities",
    description:
      "Collection of videos showcasing STEAM activities and projects.",
    link: "https://www.youtube.com/results?search_query=STEAM+activities",
    icon: FaVideo,
  },
];

export const ResourcesSection: React.FC = () => {
  return (
    <Box mt={1} p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {resources.map((resource, index) => (
          <Card
            key={index}
            borderRadius="lg"
            overflow="hidden"
            p={4}
            bg={"white"}
          >
            <Icon as={resource.icon} w={10} h={10} mb={4} color="yellowDark" />
            <Heading size="sm" mb={2}>
              {resource.name}
            </Heading>
            <Text fontSize="sm" color={"gray.700"} mb={4}>
              {resource.description}
            </Text>
            <Link href={resource.link} color="yellowDark" isExternal>
              Visit Resource
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};
