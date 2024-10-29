// src/components/user/UserProfile/UserProfile.tsx

import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
import {
  Badge,
  Box,
  Button,
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
  Stack,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaClock,
  FaCommentDots,
  FaGlobe,
  FaGraduationCap,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaTwitter,
  FaUserFriends,
} from "react-icons/fa";
import { MdInterests, MdLocationCity, MdStar, MdWork } from "react-icons/md";
import useSWR from "swr";

export const UserProfile = ({
  userId,
  isOpen,
  onClose,
  onConnectionRequest,
}: {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onConnectionRequest?: (userId: number) => void;
}) => {
  const { data: user } = useSWR(swrKeys.userInfo(userId), fetcher<IUser>);

  if (!user) {
    return <div data-testid="placeholder">Loading...</div>;
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

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{user.name || user.username}&#39;s Profile</DrawerHeader>

        <DrawerBody>
          <Box position="relative" width="100%">
            <Image
              src={user.avatar || "https://placehold.co/400x600"}
              alt={user.username}
              h="220px"
              w="100%"
              objectFit="cover"
            />
          </Box>
          <Flex flexDirection="column" p={4}>
            <Stack spacing={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md" noOfLines={1}>
                  {user.name || user.username}
                </Heading>
                <Badge fontSize="0.9em" variant={"solid"} {...roleBadgeProps}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </Flex>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {user.bio || "No bio available."}
              </Text>
              <Flex alignItems="center" gap={2}>
                <Icon as={MdWork} />
                <Text fontSize="sm">{user.jobTitle || "Professional"}</Text>
              </Flex>
              <Flex alignItems="center" gap={2}>
                <Icon as={MdLocationCity} />
                <Text fontSize="sm">
                  {user.city || "City"}, {user.country || "Country"}
                </Text>
              </Flex>
              <Flex alignItems="center" gap={2} wrap="wrap">
                <Icon as={MdInterests} />
                {user.interests?.slice(0, 3).map((interest: string) => (
                  <Tag
                    key={interest}
                    size="sm"
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    {interest}
                  </Tag>
                ))}
                {user.interests && user.interests.length > 3 && (
                  <Tag size="sm" colorScheme="blue" borderRadius="full">
                    +{user.interests.length - 3}
                  </Tag>
                )}
              </Flex>

              <HStack mt={2} spacing={3} wrap="wrap">
                <Tooltip label={`Level: ${user.level || 1}`}>
                  <Badge colorScheme="yellow" variant="solid">
                    <Icon as={MdStar} mr={1} />
                    Level {user.level || 1}
                  </Badge>
                </Tooltip>
                <Tooltip
                  label={`Experience Points: ${user.experiencePoints || 0}`}
                >
                  <Badge colorScheme="orange" variant="solid">
                    <Icon as={FaLightbulb} mr={1} />
                    {user.experiencePoints || 0} XP
                  </Badge>
                </Tooltip>
                <Tooltip
                  label={`Time Spent Learning: ${
                    user.time_spent_learning || 0
                  } hrs`}
                >
                  <Badge colorScheme="teal" variant="solid">
                    <Icon as={FaClock} mr={1} />
                    {user.time_spent_learning || 0}h
                  </Badge>
                </Tooltip>
                <Tooltip label={`Connections: ${user.connectionsCount || 0}`}>
                  <Badge colorScheme="green" variant="subtle">
                    <Icon as={FaUserFriends} mr={1} />
                    {user.connectionsCount || 0}
                  </Badge>
                </Tooltip>
                <Tooltip
                  label={`Completed Courses: ${
                    user.completed_courses_count || 0
                  }`}
                >
                  <Badge colorScheme="purple" variant="subtle">
                    <Icon as={FaGraduationCap} mr={1} />
                    {user.completed_courses_count || 0}
                  </Badge>
                </Tooltip>
                <Tooltip label={`Comments: ${user.comment_count || 0}`}>
                  <Badge colorScheme="cyan" variant="subtle">
                    <Icon as={FaCommentDots} mr={1} />
                    {user.comment_count || 0}
                  </Badge>
                </Tooltip>
                <Tooltip
                  label={`Likes Received: ${user.liked_resources_count || 0}`}
                >
                  <Badge colorScheme="red" variant="subtle">
                    <Icon as={FaHeart} mr={1} />
                    {user.liked_resources_count || 0}
                  </Badge>
                </Tooltip>
              </HStack>

              <Flex mt={4} justifyContent="space-between" alignItems="center">
                <HStack spacing={2}>
                  {user.website && (
                    <Tooltip label="Website">
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
                    </Tooltip>
                  )}
                  {user.linkedin && (
                    <Tooltip label="LinkedIn">
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
                    </Tooltip>
                  )}
                  {user.twitter && (
                    <Tooltip label="Twitter">
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
                    </Tooltip>
                  )}
                </HStack>
                <Button
                  onClick={
                    onConnectionRequest
                      ? () => onConnectionRequest(userId)
                      : undefined
                  }
                  isDisabled={!onConnectionRequest}
                  variant="outline"
                  size="sm"
                >
                  {onConnectionRequest ? (
                    <Text>Connect</Text>
                  ) : (
                    <Text>Connected</Text>
                  )}
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
