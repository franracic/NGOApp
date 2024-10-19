import { IAuthor } from "@/typings/course";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FaExternalLinkAlt, FaLinkedin, FaYoutube } from "react-icons/fa";

export const AuthorCardTooltip = ({ author }: { author: IAuthor }) => {
  return (
    <Tooltip
      label={
        <Box
          p={4}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          maxW="350px"
          color={"black"}
        >
          <VStack align="start">
            <Flex align={"center"}>
              <Avatar size="lg" name={author.name} src={author.avatar} mr={5} />
              <Text fontWeight="bold" fontSize="lg" mt={2}>
                {author.name}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500" noOfLines={3}>
              {author.bio}{" "}
            </Text>
            <Flex mt={2} alignItems="center">
              {author.linkedin && (
                <Link href={author.linkedin} isExternal mr={2}>
                  <Icon as={FaLinkedin} boxSize={5} color={"yellowDark"} />
                </Link>
              )}
              {author.youtube && (
                <Link href={author.youtube} isExternal mr={2}>
                  <Icon as={FaYoutube} boxSize={5} color={"yellowDark"} />
                </Link>
              )}
              {author.externalLink && (
                <Link href={author.externalLink} isExternal>
                  <Icon
                    as={FaExternalLinkAlt}
                    boxSize={5}
                    color={"yellowDark"}
                  />
                </Link>
              )}
            </Flex>
            <Text fontSize="xs" color="gray.400" mt={2}>
              {author.email}
            </Text>
          </VStack>
        </Box>
      }
      aria-label="Author Information"
      hasArrow
      placement="top"
      bg="transparent"
      p={0}
    >
      <Flex alignItems="center">
        <Avatar size="sm" name={author.name} src={author.avatar} mr={1} />
      </Flex>
    </Tooltip>
  );
};
