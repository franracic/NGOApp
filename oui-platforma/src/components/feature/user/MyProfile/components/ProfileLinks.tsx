import { IUser } from "@/typings/course";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGlobe, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ProfileLinksProps {
  user: IUser;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileLinks: React.FC<ProfileLinksProps> = ({
  user,
  isEditing,
  handleInputChange,
}) => {
  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" textAlign="center">
        Links
      </Text>
      {isEditing ? (
        <>
          <FormControl>
            <Input
              name="website"
              value={user.website}
              onChange={handleInputChange}
              placeholder=" "
            />
            <FormLabel>Website</FormLabel>
          </FormControl>
          <FormControl>
            <Input
              name="linkedin"
              value={user.linkedin}
              onChange={handleInputChange}
              placeholder=" "
            />
            <FormLabel>LinkedIn Profile</FormLabel>
          </FormControl>
          <FormControl>
            <Input
              name="twitter"
              value={user.twitter}
              onChange={handleInputChange}
              placeholder=" "
            />
            <FormLabel>Twitter Profile</FormLabel>
          </FormControl>
          <FormControl>
            <Input
              name="instagram"
              value={user.instagram}
              onChange={handleInputChange}
              placeholder=" "
            />
            <FormLabel>Instagram Profile</FormLabel>
          </FormControl>
        </>
      ) : (
        <HStack spacing={4} align="center" justify="center">
          {user.website && (
            <Link href={user.website} isExternal>
              <Icon as={FaGlobe} w={6} h={6} color="gray.500" />
            </Link>
          )}
          {user.linkedin && (
            <Link href={user.linkedin} isExternal>
              <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
            </Link>
          )}
          {user.twitter && (
            <Link href={user.twitter} isExternal>
              <Icon as={FaTwitter} w={6} h={6} color="cyan.500" />
            </Link>
          )}
          {user.instagram && (
            <Link href={user.instagram} isExternal>
              <Icon as={FaInstagram} w={6} h={6} color="purple.500" />
            </Link>
          )}
        </HStack>
      )}
    </Box>
  );
};
