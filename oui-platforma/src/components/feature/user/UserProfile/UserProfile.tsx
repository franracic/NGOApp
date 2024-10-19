import { IUser } from "@/typings/course";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaGlobe, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { LevelingSystem } from "../../network/LevelingSystem/LevelingSystem";

export const UserProfile = ({
  user,
  onConnect,
}: {
  user: IUser;
  onConnect: (user: IUser) => void;
}) => {
  const [connections, setConnections] = useState<{ [key: string]: string }>({});

  const handleConnectionRequest = () => {
    setConnections({ ...connections, [user.id]: "pending" });
    onConnect(user);
  };

  return (
    <Card gap={6} align="center" mb={10} p={4} h={"700px"} overflow={"auto"}>
      <Avatar size="2xl" src={user.avatar} />

      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {user.username}
        </Text>
        <Text fontSize="md" color="gray.500">
          {user.jobTitle}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {user.city}, {user.country}
        </Text>
      </Box>

      <Flex align="center" direction="column">
        <CircularProgress
          value={(user.experiencePoints || 0) / 100}
          size="120px"
          color="yellow.400"
          mb={4}
        >
          <CircularProgressLabel fontSize="xl">
            <LevelingSystem key={user.id} user={user} />
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="sm" color="gray.600">
          Experience Points
        </Text>
      </Flex>

      <Text textAlign="center" px={4} maxW="300px">
        {user.bio}
      </Text>

      <HStack spacing={4}>
        {user.linkedin && (
          <Link href={user.linkedin} isExternal>
            <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
          </Link>
        )}
        {user.twitter && (
          <Link href={user.twitter} isExternal>
            <Icon as={FaTwitter} w={6} h={6} color="cyan.500" />
          </Link>
        )}
        {user.instagram && (
          <Link href={user.instagram} isExternal>
            <Icon as={FaInstagram} w={6} h={6} color="purple.500" />
          </Link>
        )}
        {user.website && (
          <Link href={user.website} isExternal>
            <Icon as={FaGlobe} w={6} h={6} color="gray.500" />
          </Link>
        )}
      </HStack>

      <Box textAlign="center">
        <Text fontSize="md" fontWeight="bold">
          Interests
        </Text>
        <HStack spacing={2} wrap="wrap" justify="center">
          {user.interests?.map((interest) => (
            <Badge key={interest} colorScheme="yellow" variant="solid">
              {interest}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Networking Status
        </Text>
        <Badge
          colorScheme={user.isNetworking ? "green" : "red"}
          variant="solid"
          px={4}
          py={1}
          borderRadius="full"
        >
          {user.isNetworking ? "Open to Networking" : "Not Networking"}
        </Badge>
      </Box>

      <Box textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Availability Status
        </Text>
        <Badge
          colorScheme="blue"
          variant="solid"
          px={4}
          py={1}
          borderRadius="full"
        >
          {user.availabilityStatus || "Unavailable"}
        </Badge>
      </Box>

      <Button
        variant={"light"}
        size="lg"
        onClick={handleConnectionRequest}
        isDisabled={connections[user.id] === "pending"}
      >
        {connections[user.id] === "pending" ? "Request Sent" : "Connect"}
      </Button>
    </Card>
  );
};
