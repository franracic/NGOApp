import { IUser } from "@/typings/course";
import { Box, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";

interface ProfileCompletionMeterProps {
  user: IUser;
}

export const ProfileCompletionMeter: React.FC<ProfileCompletionMeterProps> = ({
  user,
}) => {
  const totalFields = 24;
  const completedFields = Object.values(user).filter(
    (value) => value !== ""
  ).length;
  const completionPercentage = (completedFields / totalFields) * 100;

  return (
    <Box textAlign="center" mb={4}>
      <Text fontWeight="bold" mb={2}>
        Completion until mentor: {Math.round(completionPercentage)}%
      </Text>
      <CircularProgress
        value={completionPercentage}
        size="100px"
        color="yellowDark"
      />
    </Box>
  );
};
