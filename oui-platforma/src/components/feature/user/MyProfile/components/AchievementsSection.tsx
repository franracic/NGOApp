import { Box, Grid, Icon, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

interface Achievement {
  title: string;
  description: string;
  icon: any; // Icon type from react-icons or similar
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
}) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={6}>
      {achievements.map((achievement, index) => (
        <Tooltip
          key={index}
          label={achievement.description}
          aria-label={achievement.description}
        >
          <Box textAlign="center">
            <Icon as={achievement.icon} boxSize={8} color="yellow.500" />
            <Text mt={2} fontSize="sm" fontWeight="bold">
              {achievement.title}
            </Text>
          </Box>
        </Tooltip>
      ))}
    </Grid>
  );
};
