import { IUser } from "@/typings/course";
import {
  Badge,
  Card,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaAward,
  FaBook,
  FaBriefcase,
  FaCheck,
  FaComment,
  FaHeart,
  FaMedal,
  FaUserFriends,
} from "react-icons/fa";
import { ProfileCompletionMeter } from "./ProfileCompletition";

export const UserProfileCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <Card gap={8} p={4} maxH={"90vh"}>
      <Heading as="h2" size="md" mb={2}>
        Profile Stats
      </Heading>

      <ProfileCompletionMeter user={user} />

      <HStack spacing={4} mt={2} mb={4} justifyContent={"center"}>
        {user.isMentor && (
          <Badge colorScheme="purple">
            <Icon as={FaMedal} mr={1} /> Mentor
          </Badge>
        )}
        {user.role === "admin" && (
          <Badge colorScheme="blue">
            <Icon as={FaBriefcase} mr={1} /> Admin
          </Badge>
        )}
      </HStack>
      <VStack spacing={2} justifyContent={"center"}>
        <HStack>
          <Icon as={FaAward} color="yellow.500" />
          <Text fontSize="sm" color="gray.600">
            Experience Points: <strong>{user.experiencePoints}</strong>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaUserFriends} color="green.500" />
          <Text fontSize="sm" color="gray.600">
            Connections Count: <strong>{user.connectionsCount}</strong>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaBook} color="blue.500" />
          <Text fontSize="sm" color="gray.600">
            Completed Courses: <strong>{user.completed_courses_count}</strong>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaCheck} color="orange.500" />
          <Text fontSize="sm" color="gray.600">
            Submitted Resources:{" "}
            <strong>{user.submitted_resources_count}</strong>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaHeart} color="red.500" />
          <Text fontSize="sm" color="gray.600">
            Liked Resources: <strong>{user.liked_resources_count}</strong>
          </Text>
        </HStack>

        <HStack>
          <Icon as={FaComment} color="pink.500" />
          <Text fontSize="sm" color="gray.600">
            Comments Made: <strong>{user.comment_count}</strong>
          </Text>
        </HStack>
      </VStack>
    </Card>
  );
};
