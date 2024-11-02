"use client";

import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";

export const CreatorsComponent = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} gap={6} p={4}>
      <Card flex={1} overflow="hidden">
        <CardBody>
          <VStack spacing={4} align="start">
            <Box>
              <Heading size="lg">Fran Račić</Heading>
              <Text fontSize="md" color="gray.600">
                Web Developer | Computer Science Student
              </Text>
              <Text fontSize="sm" color="blue.500">
                Part of OUI Organization
              </Text>
            </Box>
            <HStack spacing={2}>
              <Icon as={FaEnvelope} />
              <Link href="mailto:fran.racic@gmail.com">
                fran.racic@gmail.com
              </Link>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaMapMarkerAlt} />
              <Text>Zagreb, Croatia</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaUniversity} />
              <Text>
                Bachelor of Engineering in Computer Science, University of
                Zagreb
              </Text>
            </HStack>
            <Stack direction="row" spacing={4}>
              <Link
                href="https://github.com/FranRacic"
                isExternal
                aria-label="GitHub"
              >
                <Icon as={FaGithub} boxSize={6} />
              </Link>
              <Link
                href="https://leetcode.com/Fran_racic"
                isExternal
                aria-label="LeetCode"
              >
                <Icon as={FaGlobe} boxSize={6} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/fran-racic/"
                isExternal
                aria-label="LinkedIn"
              >
                <Icon as={FaLinkedin} boxSize={6} />
              </Link>
            </Stack>

            {/* Additional Info Section */}
            <Box>
              <Heading size="sm">About Me</Heading>
              <Text mt={2}>
                Passionate web developer with a focus on creating scalable and
                efficient solutions. Currently pursuing a degree in Computer
                Science, I have a strong foundation in web development and am
                driven by a desire to continuously learn and innovate in the
                tech space.
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
      <Card flex={1} overflow="hidden">
        <CardBody>
          <VStack spacing={4} align="start">
            <Box>
              <Heading size="lg">Noa Lampić</Heading>
              <Text fontSize="md" color="gray.600" mt={1}>
                Founder & Manager at Zen Zone Media
              </Text>
              <Text fontSize="sm" color="blue.500">
                Part of OUI Organization
              </Text>
            </Box>
            <HStack spacing={2}>
              <Icon as={FaEnvelope} />
              <Link href="mailto:noa@zenzonemedia.com">
                noa@zenzonemedia.com
              </Link>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaLinkedin} />
              <Link
                href="https://www.linkedin.com/in/noa-lampić-70150a253"
                isExternal
              >
                linkedin.com/in/noa-lampić-70150a253
              </Link>
            </HStack>
            <Text fontSize="md" mt={3}>
              <strong>Role:</strong> Digital Marketing, Web Development, and
              Business Development Expert
            </Text>
            <Text fontSize="md" mt={3}>
              <strong>Co-Founder of CraftWave:</strong> A startup leveraging AI
              to empower creative solutions. At CraftWave, Noa leads business
              development, marketing strategy, and product scaling.
            </Text>
            <Text fontSize="md" mt={3}>
              <strong>Location:</strong> Zagreb, Croatia
            </Text>
            <Text fontSize="md" mt={3}>
              <strong>Education:</strong> Faculty of Economics & Business,
              Zagreb
            </Text>
          </VStack>
        </CardBody>
      </Card>
      <Card flex={1} overflow="hidden">
        <Image
          w="100%"
          h="150px"
          src="https://media.licdn.com/dms/image/v2/D563DAQErV4orHe8KhA/image-scale_191_1128/image-scale_191_1128/0/1695146742183/zen_zone_media_cover?e=1731171600&v=beta&t=R-d2AHfgQbY8sDkNKjtU7ms-aS3fxF4qJTO5M2fhBrY"
          alt="Zen Zone Media"
        />
        <CardBody>
          <VStack spacing={4} align="start">
            <Box>
              <Heading size="lg">Zen Zone Media</Heading>
              <Text fontSize="md" color="gray.600">
                IT Services & Consulting | Marketing Agency
              </Text>
              <Text fontSize="sm" color="blue.500">
                Part of OUI Organization
              </Text>
            </Box>
            <HStack spacing={2}>
              <Icon as={FaGlobe} />
              <Link href="https://zenzonemedia.com/" isExternal>
                zenzonemedia.com
              </Link>
            </HStack>
            <Box>
              <Heading size="sm">Industry</Heading>
              <Text>IT Services and IT Consulting</Text>
            </Box>
            <Text fontSize="md" mt={3}>
              Zen Zone Media is a marketing agency dedicated to helping web
              developers and small businesses establish a strong online
              presence. With expertise in web development, digital marketing,
              and SEO, we empower clients to connect with their target audience
              effectively.
            </Text>
            <Text fontSize="md" mt={3}>
              Zen Zone Media specializes in boosting organic traffic and
              increasing engagement through personalized and impactful marketing
              strategies.
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};
