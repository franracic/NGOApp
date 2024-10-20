"use client";
import { Hero } from "@/components/core/Hero/Hero";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IUser } from "@/typings/course";
import { Flex, useToast } from "@chakra-ui/react";
import useSWR from "swr";
import { ResourceInvite } from "../ResourceInvite/ResourceInvite";
import { ResourceList } from "../ResourceList/ResourceList";

export const ResourceLayout = () => {
  const toast = useToast();
  const { data: currentUser, error } = useSWR(
    swrKeys.currentUser,
    fetcher<IUser>
  );
  if (error) {
    toast({
      title: "Error Loading User Data",
      description: "An error occurred while loading user data.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return null;
  }
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Hero
        headingText="Resources"
        subheadingText="Access a Wealth of Knowledge"
        bodyText="Discover a curated collection of articles, guides, and tools to support your learning and development."
        img_url="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <ResourceList currentUser={currentUser} />
      <ResourceInvite currentUser={currentUser} />
    </Flex>
  );
};
