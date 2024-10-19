import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface TrophyCardProps {
  title: string;
  description: string;
  icon: any;
  progress: number;
  isEarned: boolean;
}

export const TrophyCard: React.FC<TrophyCardProps> = ({
  title,
  description,
  icon,
  progress,
  isEarned,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ transform: isEarned ? "none" : "scale(1.05)", boxShadow: "xl" }}
      opacity={isEarned ? 1 : 0.8}
    >
      <VStack align="center" spacing={4}>
        <Box position="relative" display="inline-block">
          <CircularProgress
            value={progress}
            color={isEarned ? "green.400" : "yellow.400"}
            size="40%"
            thickness="8px"
            display={"flex"}
            justifyContent={"center"}
          >
            <CircularProgressLabel>
              <Icon
                as={icon}
                boxSize={10}
                color={isEarned ? "green.400" : "yellow.500"}
              />
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          {description}
        </Text>
        {!isEarned && (
          <Text fontSize="xs" color="gray.500">
            {progress}% completed
          </Text>
        )}
      </VStack>
    </Box>
  );
};
