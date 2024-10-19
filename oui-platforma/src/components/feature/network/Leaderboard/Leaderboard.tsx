import { IUser } from "@/typings/course";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface LeaderboardProps {
  users: IUser[];
  criterion: "activityLevel" | "experiencePoints" | "connectionsCount";
}

export const Leaderboard = ({ users, criterion }: LeaderboardProps) => {
  const sortedUsers = [...users]
    .sort((a, b) => (b[criterion] || 0) - (a[criterion] || 0))
    .slice(0, 5);

  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading size="lg" mb={4}>
        Top Users by {criterion}
      </Heading>
      <VStack spacing={4} align="start">
        {sortedUsers.map((user, index) => (
          <Box
            key={user.id}
            p={4}
            border="1px solid"
            borderRadius="md"
            w="full"
          >
            <Text fontWeight="bold">
              {index + 1}. {user.username}
            </Text>
            <Text>Job Title: {user.jobTitle}</Text>
            <Text>
              {criterion}: {user[criterion]}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
