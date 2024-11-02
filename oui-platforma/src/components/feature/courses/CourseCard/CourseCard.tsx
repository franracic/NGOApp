import RatingText from "@/components/shared/RatingText/RatingText";
import TotalDurationText from "@/components/shared/RatingText/TotalDurationText";
import { ICourse } from "@/typings/course";
import { CheckCircleIcon, LockIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthorCardTooltip } from "../AuthorCardTooltip/AuthorCardTooltip";

const placeholderImage = "https://fakeimg.pl/600x400?text=No+image";

interface ICourseCardProps extends Partial<ICourse> {
  link?: boolean;
  loading?: boolean;
}

export const CourseCard = ({
  title,
  average_rating,
  cover_image,
  id,
  authors,
  no_of_ratings,
  total_duration,
  type,
  course = "STEM Youth Worker",
  is_unlocked,
  link = true,
  loading = false,
  progress = 0,
  is_completed,
}: ICourseCardProps) => {
  return (
    <Tooltip
      label="Complete previous sections to unlock this course."
      isDisabled={is_unlocked}
      placement="top"
    >
      <Box {...(is_unlocked ? {} : { cursor: "not-allowed" })}>
        <Card
          {...(is_unlocked && link && !loading
            ? {
                as: NextLink,
                href: `/courses/${id}`,
              }
            : { href: undefined })}
          overflow="hidden"
          flexGrow={1}
          minWidth={0}
          data-testid="course-card"
          opacity={is_unlocked ? 1 : 0.5}
          position="relative"
        >
          {loading ? (
            <SkeletonCircle
              size="100px"
              position="absolute"
              top="30%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={2}
            />
          ) : (
            <Flex
              position="absolute"
              top="30%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={2}
              color="gray.700"
              p={2}
              alignItems={"center"}
              borderRadius="md"
              bg={"yellowBg"}
            >
              {!is_unlocked ? (
                <>
                  <LockIcon boxSize={8} />
                  <Text>Locked</Text>
                </>
              ) : is_completed ? (
                <Tooltip label="Completed">
                  <Box textAlign="center">
                    <CheckCircleIcon boxSize={"100px"} color="white" />
                  </Box>
                </Tooltip>
              ) : (
                <Box>
                  <Tooltip label={`${progress}% completed`}>
                    <CircularProgress
                      value={progress}
                      color="yellowDark"
                      size="100px"
                    >
                      <CircularProgressLabel>{progress}%</CircularProgressLabel>
                    </CircularProgress>
                  </Tooltip>
                </Box>
              )}
            </Flex>
          )}
          <Box position="relative" width="100%" h="200px">
            <Skeleton isLoaded={!loading} height="100%" width="100%">
              <Image
                src={cover_image || placeholderImage}
                alt={title}
                data-testid="placeholder"
                sizes="(max-width: 768px) 25vw"
                h="100%"
                w="100%"
                sx={{ objectFit: "cover" }}
              />
            </Skeleton>
          </Box>
          <CardBody color="brand.800" flexGrow={0}>
            <Heading
              size="md"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              mb={2}
            >
              {loading ? <SkeletonText noOfLines={1} width="70%" /> : title}
            </Heading>
            {loading ? (
              <Stack spacing={2}>
                <Skeleton height="20px" width="50%" />
                <Skeleton height="20px" width="30%" />
                <Skeleton height="20px" width="20%" />
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Flex gap={1}>
                  {authors?.map((author) => (
                    <AuthorCardTooltip key={author.email} author={author} />
                  ))}
                </Flex>
                <RatingText
                  average_rating={average_rating}
                  no_of_reviews={no_of_ratings}
                />
                <TotalDurationText total_duration={total_duration} />
                <Badge
                  colorScheme={
                    type === "Lecture"
                      ? "blue"
                      : type === "Workshop"
                      ? "orange"
                      : "red"
                  }
                >
                  {type}
                </Badge>
              </Stack>
            )}
            {loading ? (
              <Skeleton height="20px" mt={3} width="30%" />
            ) : (
              <Badge
                colorScheme="yellow"
                mt={3}
                display="block"
                textAlign="center"
                fontSize="sm"
              >
                {course}
              </Badge>
            )}
          </CardBody>
        </Card>
      </Box>
    </Tooltip>
  );
};
