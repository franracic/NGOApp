import { IUser } from "@/typings/course";
import { Box, Card, Grid, Heading, Text, VStack } from "@chakra-ui/react";

export const MentorDashboard = ({ mentor }: { mentor: IUser }) => {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Mentor Dashboard
      </Heading>
      {mentor.mentees && mentor.mentees.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {mentor.mentees.map((mentee) => (
            <Card key={mentee.id}>
              <VStack align="start" spacing={2} p={4}>
                <Text fontWeight="bold">{mentee.username}</Text>
                <Text fontSize="sm" color="gray.500">
                  {mentee.jobTitle}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Progress: {mentee.activityLevel}% completed
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Points: {mentee.experiencePoints}
                </Text>
              </VStack>
            </Card>
          ))}
        </Grid>
      ) : (
        <Text>No mentees assigned yet.</Text>
      )}
    </Box>
  );
};
