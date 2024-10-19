import RatingText from "@/components/shared/RatingText/RatingText";
import TotalDurationText from "@/components/shared/RatingText/TotalDurationText";
import { ICourse } from "@/typings/course";
import { LockIcon } from "@chakra-ui/icons";
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
import { useCompletedVideos } from "../CompletedVideosContext/CompletedVideosContext";

const placeholderImage = "https://fakeimg.pl/600x400?text=No+image";

interface ICourseCardProps extends Partial<ICourse> {
  link?: boolean;
  onComplete?: () => void;
  loading?: boolean;
}

export const CourseCard = ({
  title,
  average_rating,
  cover_image,
  id,
  authors,
  no_of_reviews,
  total_duration,
  type,
  course = "STEM Youth Worker",
  isUnlocked,
  link = true,
  onComplete,
  sections,
  loading = false,
}: ICourseCardProps) => {
  const { completedVideos } = useCompletedVideos();

  const totalVideos = sections?.flatMap((section) => section.contents).length;
  const completedVideoCount =
    sections
      ?.flatMap((section) => section.contents)
      .filter((video) => completedVideos.has(video.title)).length ?? 0;
  const completionPercentage = totalVideos
    ? Math.round((completedVideoCount / totalVideos) * 100)
    : 0;

  return (
    <Tooltip
      label="Complete previous sections to unlock this course."
      isDisabled={isUnlocked}
      placement="top"
    >
      <Box {...(isUnlocked ? {} : { cursor: "not-allowed" })}>
        <Card
          {...(isUnlocked && link && !loading
            ? {
                as: NextLink,
                href:
                  type === "Lecture"
                    ? `/courses/${id}`
                    : type === "Workshop"
                    ? `/workshops/${id}`
                    : `/exams/${id}`,
              }
            : { href: undefined })}
          overflow="hidden"
          flexGrow={1}
          minWidth={0}
          data-testid="course-card"
          opacity={isUnlocked ? 1 : 0.5}
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
              {!isUnlocked ? (
                <>
                  <LockIcon boxSize={20} />
                  <Text>Locked</Text>
                </>
              ) : (
                <Box>
                  <Tooltip label={`${completionPercentage}% completed`}>
                    <CircularProgress
                      value={completionPercentage}
                      color="yellowDark"
                      size="100px"
                    >
                      <CircularProgressLabel>
                        {completionPercentage}%
                      </CircularProgressLabel>
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
                  no_of_reviews={no_of_reviews}
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
