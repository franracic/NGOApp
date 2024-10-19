import { Avatar, Box, Button, Input } from "@chakra-ui/react";
import React from "react";

interface AvatarSectionProps {
  avatar: string;
  isEditing: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatar,
  isEditing,
  handleFileChange,
}) => {
  return (
    <Box textAlign="center">
      <Avatar size="2xl" src={avatar} />
      {isEditing && (
        <Button as="label" variant="light" my={2}>
          Change Avatar
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </Button>
      )}
    </Box>
  );
};
