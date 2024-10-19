"use client";

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface ShortenedTrophyCardProps {
  title: string;
  description: string;
  icon: any;
  progress: number;
}

export const ShortenedTrophyCard: React.FC<ShortenedTrophyCardProps> = ({
  title,
  description,
  icon,
  progress,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Tooltip label={description} fontSize="md" placement="top" hasArrow>
      <Box
        p={2}
        bg={bgColor}
        borderRadius="lg"
        boxShadow="md"
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        opacity={0.9}
      >
        <VStack align="center" spacing={2}>
          <Box position="relative" display="inline-block">
            <CircularProgress
              value={progress}
              color={progress >= 100 ? "green.400" : "yellow.400"}
              size="60px"
              thickness="8px"
              display={"flex"}
              justifyContent={"center"}
            >
              <CircularProgressLabel>
                <Icon
                  as={icon}
                  boxSize={6}
                  color={progress >= 100 ? "green.400" : "yellow.500"}
                />
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box>
            <Box fontSize="xs" fontWeight="bold" color={textColor}>
              {title}
            </Box>
          </Box>
        </VStack>
      </Box>
    </Tooltip>
  );
};
