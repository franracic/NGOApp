"use client";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
import {
  Badge,
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  Stack,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaAward,
  FaBook,
  FaCheck,
  FaComment,
  FaGlobe,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaUserFriends,
} from "react-icons/fa";
import { MdInterests, MdLocationCity, MdWork } from "react-icons/md";
import useSWR from "swr";

export const UserProfile = ({
  userId,
  isOpen = false,
  onClose = () => {},
  onConnectionRequest,
  isInline,
}: {
  userId: number;
  isOpen?: boolean;
  onClose?: () => void;
  onConnectionRequest?: (userId: number) => void;
  isInline?: boolean;
}) => {
  const { data: user } = useSWR(swrKeys.userInfo(userId), fetcher<IUser>);

  if (!user) {
    return null;
  }

  const getRoleBadgeProps = (role: string) => {
    switch (role.toLowerCase()) {
      case "beginner":
        return { colorScheme: "green" };
      case "worker":
        return { colorScheme: "blue" };
      case "mentor":
        return { colorScheme: "orange" };
      case "practitioner":
        return { colorScheme: "teal" };
      case "admin":
        return {
          colorScheme: "purple",
          variant: "solid",
        };
      default:
        return { colorScheme: "gray" };
    }
  };

  const roleBadgeProps = getRoleBadgeProps(user.role);
  const levelProgress = (user.level / 10) * 100;

  const renderUserInfo = () => (
    <Card p={4} variant={"light"}>
      <Box position="relative" width="100%" mb={4}>
        <Image
          src={user.avatar || "https://placehold.co/400x600?text=No+Avatar"}
          alt={user.username}
          h="220px"
          w="100%"
          objectFit="cover"
          borderRadius="lg"
        />
      </Box>
      <Flex flexDirection="column">
        <Stack spacing={3}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md" noOfLines={1}>
              {user.name || user.username}
            </Heading>
            <Badge fontSize="0.9em" {...roleBadgeProps}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </Flex>

          {user.jobTitle && (
            <Flex alignItems="center" gap={2}>
              <Icon as={MdWork} />
              <Text fontSize="sm">{user.jobTitle}</Text>
            </Flex>
          )}

          {(user.city || user.country) && (
            <Flex alignItems="center" gap={2}>
              <Icon as={MdLocationCity} />
              <Text fontSize="sm">
                {user.city}
                {user.city && user.country ? ", " : ""}
                {user.country}
              </Text>
            </Flex>
          )}

          {user.interests && user.interests.length > 0 && (
            <Flex alignItems="center" gap={2} wrap="wrap">
              <Icon as={MdInterests} />
              {user.interests.slice(0, 3).map((interest: string) => (
                <Tag
                  key={interest}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                >
                  {interest}
                </Tag>
              ))}
              {user.interests.length > 3 && (
                <Tag size="sm" colorScheme="blue" borderRadius="full">
                  +{user.interests.length - 3}
                </Tag>
              )}
            </Flex>
          )}

          <Stack spacing={1}>
            <Text fontSize="sm" color="gray.600">
              Level: {user.level} / 10
            </Text>
            <Progress colorScheme="yellow" size="sm" value={levelProgress} />
          </Stack>

          {user.NGO && (
            <Badge fontSize="lg" w={"fit-content"}>
              NGO: {user.NGO}
            </Badge>
          )}

          <HStack mt={4} spacing={3} wrap="wrap">
            <Tooltip label={`Experience Points: ${user.experiencePoints || 0}`}>
              <Badge colorScheme="yellow">
                <Icon as={FaAward} mr={1} color="yellow.500" />
                {user.experiencePoints || 0} XP
              </Badge>
            </Tooltip>
            <Tooltip label={`Connections: ${user.connectionsCount || 0}`}>
              <Badge colorScheme="green">
                <Icon as={FaUserFriends} mr={1} color="green.500" />
                {user.connectionsCount || 0} Connections
              </Badge>
            </Tooltip>
            <Tooltip
              label={`Completed Courses: ${user.completed_courses_count || 0}`}
            >
              <Badge colorScheme="blue">
                <Icon as={FaBook} mr={1} color="blue.500" />
                {user.completed_courses_count || 0} Courses
              </Badge>
            </Tooltip>
            <Tooltip
              label={`Submitted Resources: ${
                user.submitted_resources_count || 0
              }`}
            >
              <Badge colorScheme="orange">
                <Icon as={FaCheck} mr={1} color="orange.500" />
                {user.submitted_resources_count || 0} Resources
              </Badge>
            </Tooltip>
            <Tooltip
              label={`Liked Resources: ${user.liked_resources_count || 0}`}
            >
              <Badge colorScheme="red">
                <Icon as={FaHeart} mr={1} color="red.500" />
                {user.liked_resources_count || 0} Likes
              </Badge>
            </Tooltip>
            <Tooltip label={`Comments Made: ${user.comment_count || 0}`}>
              <Badge colorScheme="pink">
                <Icon as={FaComment} mr={1} color="pink.500" />
                {user.comment_count || 0} Comments
              </Badge>
            </Tooltip>
          </HStack>

          {(user.website || user.linkedin || user.twitter) && (
            <HStack mt={4} spacing={2}>
              {user.website && (
                <Button
                  as="a"
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                >
                  <FaGlobe />
                </Button>
              )}
              {user.linkedin && (
                <Button
                  as="a"
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                >
                  <FaLinkedin />
                </Button>
              )}
              {user.twitter && (
                <Button
                  as="a"
                  href={user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                >
                  <FaTwitter />
                </Button>
              )}
            </HStack>
          )}

          {onConnectionRequest && (
            <Button
              onClick={() => onConnectionRequest(userId)}
              variant="outline"
              size="sm"
              mt={2}
            >
              Connect
            </Button>
          )}
        </Stack>
      </Flex>
    </Card>
  );

  if (isInline) {
    return renderUserInfo();
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{user.name || user.username}&#39;s Profile</DrawerHeader>
        <DrawerBody>{renderUserInfo()}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
