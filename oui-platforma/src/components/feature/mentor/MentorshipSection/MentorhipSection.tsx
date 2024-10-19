"use client";
import { Hero } from "@/components/core/Hero/Hero";
import { IUser } from "@/typings/course";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { generateMockUsers } from "../../network/GenerateMockUsers/GenerateMockUsers";
import { MentorDashboard } from "../MentorDashboard/MentorDashboard";
import { MentorSearch } from "../MentorSearch/MentorSearch";

const mockUsers: IUser[] = generateMockUsers(6);

export const MentorshipSection = () => {
  const [selectedUser, setSelectedUser] = React.useState<number>(0);

  return (
    <Flex flexDirection={"column"} justifyContent="center">
      <Hero
        headingText="Mentorship"
        subheadingText="Guiding You Towards Success"
        bodyText="Connect with experienced professionals who can help you navigate your career and educational journey."
        img_url="url('https://www.gettingsmart.com/wp-content/uploads/2020/10/Mentorship-.jpg')"
      />
      <Box mx="auto" mt={8} maxW="1200px" p={4}>
        <MentorSearch mentors={mockUsers} />
        <MentorDashboard mentor={mockUsers[selectedUser]} />
      </Box>
    </Flex>
  );
};
