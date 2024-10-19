import { IUser } from "@/typings/course";
import { Box, Input, Text } from "@chakra-ui/react";
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
        </>
      )}
    </Box>
  );
};
