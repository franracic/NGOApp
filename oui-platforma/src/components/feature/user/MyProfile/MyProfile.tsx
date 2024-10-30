import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
import {
  Box,
  Button,
  Card,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { ActivityFeed } from "./components/Activity";
import { AvatarSection } from "./components/AvatarSection";
import { CroppingModal } from "./components/CroppingModal";
import { NetworkingStatus } from "./components/NetworkingStatus";
import { ProfileBio } from "./components/ProfileBio";
import { ProfileCompletionMeter } from "./components/ProfileCompletition";
import { ProfileDetails } from "./components/ProfileDetails";
import { ProfileLinks } from "./components/ProfileLinks";
import { SocialsCard } from "./components/SocialsCard";

export const MyProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const {
    data: user,
    mutate,
    error,
  } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const toast = useToast();

  if (error) return <div>Failed to load profile</div>;
  if (!user) return <div>Loading...</div>;
  console.log(user);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    mutate({ ...user, [name]: value }, false);
  };

  const handleToggleNetworkingStatus = async () => {
    user.isNetworking = !user.isNetworking;
    mutate({ ...user, isNetworking: user.isNetworking }, false);
    await fetch(swrKeys.updateUser(user.id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch(swrKeys.updateUser(user.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      toast({
        title: "Profile updated.",
        description: "Your profile changes have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile changes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setIsCropping(true);
      });
    }
  };

  if (!user) return null;

  const handleSaveCroppedImage = async (croppedImage: string) => {
    try {
      const blob = await (await fetch(croppedImage)).blob();
      const file = new File([blob], "avatar.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("avatar", file);

      await fetch(swrKeys.updateUser(user.id), {
        method: "PATCH",
        body: formData,
      });

      mutate({ ...user, avatar: URL.createObjectURL(file) }, false);

      toast({
        title: "Avatar updated.",
        description: "Your new avatar has been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save avatar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      gap={6}
      alignItems="center"
      display={"flex"}
      flexDirection={"column"}
      p={4}
      bg={"transparent"}
    >
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        <Card gap={8} p={4}>
          <AvatarSection
            avatar={user.avatar || ""}
            isEditing={isEditing}
            handleFileChange={handleFileChange}
          />
          <ProfileDetails
            user={user}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          <ProfileLinks
            user={user}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          <ProfileBio
            bio={user.bio}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
        </Card>
        <Card gap={8} p={4}>
          <Heading as="h2" size="md">
            Profile Stats
          </Heading>
          <NetworkingStatus
            isNetworking={user.isNetworking}
            handleToggleNetworkingStatus={handleToggleNetworkingStatus}
          />
          <ProfileCompletionMeter user={user} />
          <Text fontSize="sm" color="gray.400">
            Activity Level: {user.activityLevel}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Experience Points: {user.experiencePoints}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Connections Count: {user.connectionsCount}
          </Text>
        </Card>
        <ActivityFeed />
        <SocialsCard user={user} />
      </SimpleGrid>
      <Button
        onClick={isEditing ? handleSave : toggleEditing}
        variant="light"
        size="lg"
        isLoading={isLoading}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
      <CroppingModal
        imageSrc={imageSrc}
        setUser={handleSaveCroppedImage}
        setIsCropping={setIsCropping}
        isCropping={isCropping}
      />
    </Box>
  );
};
