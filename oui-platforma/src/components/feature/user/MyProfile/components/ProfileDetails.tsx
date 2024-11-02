import { IUser } from "@/typings/course";
import { Badge, Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ProfileDetailsProps {
  user: IUser;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  user,
  isEditing,
  handleInputChange,
}) => {
  return (
    <Box textAlign="center">
      {isEditing ? (
        <>
          <Input
            name="name"
            placeholder="Full name"
            value={user.name}
            onChange={handleInputChange}
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={2}
          />
          <Input
            name="jobTitle"
            placeholder="Job Title"
            value={user.jobTitle}
            onChange={handleInputChange}
            fontSize="md"
            color="gray.500"
            textAlign="center"
            mb={2}
          />
          <Input
            name="city"
            placeholder="City"
            value={user.city}
            onChange={handleInputChange}
            fontSize="sm"
            color="gray.400"
            textAlign="center"
            mb={2}
          />
          <Input
            name="country"
            placeholder="Country"
            value={user.country}
            onChange={handleInputChange}
            fontSize="sm"
            color="gray.400"
            textAlign="center"
            mb={2}
          />
          <VStack align="center" mt={4}>
            <Text fontSize="md" color="gray.500" fontWeight="bold">
              Interests
            </Text>
            <Input
              name="interests"
              placeholder="Enter interests separated by commas"
              value={user.interests?.join(", ") || ""}
              onChange={handleInputChange}
              fontSize="sm"
              color="gray.400"
              textAlign="center"
              mb={2}
            />
          </VStack>
          <Input
            name="NGO"
            placeholder="NGO"
            value={user.NGO}
            onChange={handleInputChange}
            fontSize="sm"
            color="gray.400"
            textAlign="center"
            mb={2}
          />
        </>
      ) : (
        <>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {user.jobTitle}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {user.city}, {user.country}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight={"bold"}>
            {user.role}
          </Text>
          <HStack justify="center" mt={2}>
            <Badge colorScheme="green" fontSize="0.8em" px={2}>
              {user.NGO ? user.NGO : "Individual"}
            </Badge>
          </HStack>

          {user.interests && user.interests.length > 0 && (
            <VStack mt={4}>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Interests
              </Text>
              <HStack spacing={2}>
                {user.interests.map((interest: string, index: number) => (
                  <Badge key={index} colorScheme="blue" fontSize="0.8em" px={2}>
                    {interest}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          )}
        </>
      )}
    </Box>
  );
};
