import { IUser } from "@/typings/course";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface ProfileCompletionMeterProps {
  user: IUser;
}

export const ProfileCompletionMeter: React.FC<ProfileCompletionMeterProps> = ({
  user,
}) => {
  const experiencePoints = user.experiencePoints || 0;
  const level = user.level;
  const experiencePercentage = (experiencePoints / 1000) * 100;

  return (
    <Box textAlign="center" mb={4}>
      <CircularProgress
        value={experiencePercentage}
        size="180px"
        color="yellowDark"
        thickness="8px"
      >
        <CircularProgressLabel>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Level: {level}
            </Text>
            <Text fontSize="sm">{experiencePoints}XP</Text>
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};
