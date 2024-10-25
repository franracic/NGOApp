import { ITrophy } from "@/typings/course";
import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

export const TrophyCard: React.FC<ITrophy> = ({
  title,
  description,
  icon,
  progress,
  is_earned,
  difficulty,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const difficultyColor =
    {
      "very easy": "green",
      easy: "teal",
      medium: "yellow",
      hard: "orange",
      "very hard": "red",
      "extremely hard": "purple",
    }[difficulty] || "gray";

  const IconComponent = require("react-icons/fa")[
    icon as keyof typeof import("react-icons/fa")
  ] as IconType;

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{
        transform: is_earned ? "none" : "scale(1.05)",
        boxShadow: "xl",
      }}
      opacity={is_earned ? 1 : 0.8}
    >
      <VStack align="center" spacing={4}>
        <Box position="relative" display="inline-block">
          <CircularProgress
            value={progress}
            color={is_earned ? "green.400" : "yellow.400"}
            size="40%"
            thickness="8px"
            display={"flex"}
            justifyContent={"center"}
          >
            <CircularProgressLabel>
              <Icon
                as={IconComponent}
                boxSize={10}
                color={is_earned ? "green.400" : "yellow.500"}
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
        <Badge colorScheme={difficultyColor} fontSize="sm">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
        {!is_earned && (
          <Text fontSize="xs" color="gray.500">
            {progress}% completed
          </Text>
        )}
      </VStack>
    </Box>
  );
};
