"use client";

import { IUser } from "@/typings/course";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  Progress,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MdInterests, MdLocationCity, MdWork } from "react-icons/md";

export const UserCard = ({
  user,
  onMessageClick,
}: {
  user: IUser;
  onMessageClick?: (userId: number) => void;
}) => {
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
    <Card
      h="fit-content"
      overflow="hidden"
      flexGrow={0}
      variant="outline"
      minWidth={0}
      data-testid="user-card"
      height={"100%"}
    >
      <Box position="relative" width="100%">
        <Image
          src={user.avatar || "https://placehold.co/400x600?text=No+Avatar"}
          alt={user.username}
          h="220px"
          w="100%"
          objectFit="cover"
        />
      </Box>
      <CardBody p={4}>
        <Stack spacing={3} justifyContent={"space-between"}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md" noOfLines={1}>
              {user.name || user.username}
            </Heading>
            <Badge fontSize="0.9em" variant={"outline"} {...roleBadgeProps}>
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
              {user.interests.slice(0, 3).map((interest) => (
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
              Level: {user.level}
            </Text>
            <Progress
              colorScheme="yellow"
              size="sm"
              value={(user.level / 10) * 100}
            />
          </Stack>
          {user.NGO && (
            <Badge fontSize="sm" w={"fit-content"} bgColor={"yellowDark"}>
              NGO: {user.NGO}
            </Badge>
          )}

          <Button variant="outline" size="sm">
            View Profile
          </Button>
          {onMessageClick && (
            <Button
              variant="solid"
              colorScheme="yellow"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                onMessageClick(user.id);
              }}
            >
              Message
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
