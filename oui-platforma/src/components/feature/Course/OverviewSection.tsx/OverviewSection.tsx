import RatingText from "@/components/shared/RatingText/RatingText";
import TotalDurationText from "@/components/shared/RatingText/TotalDurationText";
import { ICourse } from "@/typings/course";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaExternalLinkAlt, FaLinkedin, FaYoutube } from "react-icons/fa";
export const OverviewSection = ({ course }: { course: ICourse }) => {
  if (!course) {
    return null;
  }

  const {
    title,
    course: parentCourse,
    average_rating,
    description,
    no_of_reviews,
    authors,
    total_duration,
    type,
    completed,
  } = course;

  return (
    <Box mt={1} p={4}>
      <Flex alignItems={"center"} gap={4}>
        <Badge
          colorScheme={
            type === "Lecture" ? "blue" : type === "Workshop" ? "orange" : "red"
          }
          textAlign="center"
          fontSize="lg"
        >
          {type}
        </Badge>
        <Badge
          colorScheme="yellow"
          display="block"
          textAlign="center"
          fontSize="lg"
        >
          {parentCourse}
        </Badge>
      </Flex>
      <Heading
        size="md"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        my={4}
      >
        {title}
      </Heading>

      <Flex mt={2} alignItems="center" gap={4}>
        <RatingText
          average_rating={average_rating}
          no_of_reviews={no_of_reviews}
        />
        {total_duration && (
          <TotalDurationText total_duration={total_duration} />
        )}
        {completed && (
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold" fontSize={"md"}>
              {completed}
            </Text>{" "}
            <Text as={"span"} color={"gray.600"}>
              students
            </Text>
          </Text>
        )}
      </Flex>

      {authors && authors.length > 0 && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Authors
          </Text>
          {authors.map((author, index) => (
            <Box key={index} mt={4}>
              <Flex alignItems="center">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  boxSize="50px"
                  borderRadius="full"
                  mr={4}
                />
                <Box>
                  <Text fontSize="md" fontWeight="bold">
                    {author.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {author.bio}
                  </Text>

                  <Flex mt={2} alignItems="center">
                    {author.linkedin && (
                      <Link href={author.linkedin} isExternal mr={2}>
                        <Icon
                          as={FaLinkedin}
                          boxSize={5}
                          color={"yellowDark"}
                        />
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
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      )}

      {description && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Description
          </Text>
          <Text>{description}</Text>
        </Box>
      )}
    </Box>
  );
};
