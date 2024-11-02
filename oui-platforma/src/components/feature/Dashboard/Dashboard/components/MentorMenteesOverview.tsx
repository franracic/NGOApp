"use client";
import { IUser } from "@/typings/course";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";

export const CompactMentorMenteesOverview = ({ mentor }: { mentor: IUser }) => {
  const textColor = "gray.800";
  const textSecondary = "gray.400";

  return (
    <Box p={2} bg="white" shadow="sm" borderRadius="md" w="full">
      <Flex align="center" justify="space-between" px={4} py={6}>
        <Flex align="center">
          <Box position="relative" p={3} bg="yellow.100" rounded="full">
            <MdPerson />
          </Box>
          <Text
            ml={2}
            fontSize="sm"
            fontWeight="semibold"
            color={textColor}
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            Mentees Overview
          </Text>
        </Flex>
      </Flex>
      <VStack spacing={2} px={4} py={2} align="start">
        {mentor.mentees && mentor.mentees.length > 0 ? (
          mentor.mentees.slice(0, 2).map((mentee) => (
            <Link key={mentee.id} href={`/users/${mentee.id}`} isExternal>
              <Text fontSize="sm" color={textSecondary} isTruncated>
                {mentee.name}
              </Text>
            </Link>
          ))
        ) : (
          <Text fontSize="sm" color={textSecondary}>
            No mentees yet.
          </Text>
        )}
      </VStack>
    </Box>
  );
};
