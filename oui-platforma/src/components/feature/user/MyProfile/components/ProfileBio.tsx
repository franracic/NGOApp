import { Box, Text, Textarea } from "@chakra-ui/react";
import React from "react";

interface ProfileBioProps {
  bio: string | undefined;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProfileBio: React.FC<ProfileBioProps> = ({
  bio,
  isEditing,
  handleInputChange,
}) => {
  return (
    <Box textAlign="center" px={4}>
      {isEditing ? (
        <Textarea
          name="bio"
          value={bio}
          onChange={handleInputChange}
          size="sm"
          resize="vertical"
          placeholder="Tell us about yourself"
        />
      ) : (
        <Text>{bio}</Text>
      )}
    </Box>
  );
};
