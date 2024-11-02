"use client";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
import { Box, Button, Card, SimpleGrid, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { ActivityFeed } from "./components/Activity";
import { AvatarSection } from "./components/AvatarSection";
import { CroppingModal } from "./components/CroppingModal";
import { ProfileBio } from "./components/ProfileBio";
import { ProfileDetails } from "./components/ProfileDetails";
import { ProfileLinks } from "./components/ProfileLinks";
import { UserProfileCard } from "./components/UserProfileCard";

export default function MyProfile() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "interests") {
      const interestsArray = value
        .split(",")
        .map((interest) => interest.trim());
      mutate({ ...user, interests: interestsArray }, false);
    } else {
      mutate({ ...user, [name]: value }, false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const patchedUser = {
        name: user.name,
        jobTitle: user.jobTitle,
        city: user.city,
        country: user.country,
        NGO: user.NGO,
        bio: user.bio,
        website: user.website,
        linkedin: user.linkedin,
        twitter: user.twitter,
        instagram: user.instagram,
        interests: user.interests,
      };
      await fetcher(swrKeys.updateUser(user.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchedUser),
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

  const handleSaveCroppedImage = async (croppedImage: string) => {
    try {
      const blob = await (await fetch(croppedImage)).blob();
      const file = new File([blob], "avatar.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("avatar", file);

      await fetcher(swrKeys.updateUser(user.id), {
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
      maxH={"100vh"}
    >
      <SimpleGrid columns={[1, 2, 3]} gap="6">
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
        <UserProfileCard user={user} />
        <ActivityFeed />
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
}
