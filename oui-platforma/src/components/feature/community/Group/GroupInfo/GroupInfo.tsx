"use client";
import { mockUserList } from "@/components/feature/Course/courseMock/usersMock";
import { IDiscussion, IGroup } from "@/typings/course";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const mockGroups: IGroup[] = [
  {
    id: 1,
    name: "STEAM Innovators",
    description: "A group for educators and innovators passionate about STEAM.",
    members: 12,
    memberList: mockUserList, // Assuming mockUserList is a list of users with interests in STEAM
    level: 5,
  },
  {
    id: 2,
    name: "Growth Mindset Educators",
    description:
      "A community for discussing growth mindset strategies in education.",
    members: 9,
    memberList: mockUserList, // Assuming mockUserList is a list of users with interests in growth mindset
    level: 4,
  },
];

const mockGroupDiscussions: IDiscussion[] = [
  {
    id: 1,
    title: "Implementing STEAM in K-12",
    author: "Emily Carter",
    content:
      "What are the best practices for integrating STEAM into K-12 curricula?",
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "Encouraging Growth Mindset in Students",
    author: "Laura White",
    content:
      "How do you foster a growth mindset in your students? What activities work best?",
    timestamp: new Date(),
  },
];

export const GroupInfo = () => {
  const { id } = useParams<{ id: string }>();
  const group = mockGroups.find((grp) => grp.id === parseInt(id));
  const [activeDiscussion] = useState<IDiscussion | null>(
    mockGroupDiscussions[0]
  );

  if (!group) {
    return <Text>Group not found</Text>;
  }

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Card variant={"light"} w={"full"}>
        <Heading size="xl" mb={4}>
          {group.name}
        </Heading>
        <Badge colorScheme="green" mb={4}>
          {group.members} Members
        </Badge>
        <Divider mb={4} />
        <Text fontSize="lg" mb={8}>
          {group.description}
        </Text>
      </Card>

      <Divider my={4} />

      <VStack align="start" mb={8}>
        <Heading size="md" mb={4}>
          Group Members
        </Heading>
        {group.memberList?.length > 0 ? (
          group.memberList.map((member) => (
            <HStack key={member.id} spacing={4} mb={4}>
              <Avatar src={member.avatar} name={member.username} />
              <Text>{member.username}</Text>
            </HStack>
          ))
        ) : (
          <Text color="gray.500">No members found.</Text>
        )}
      </VStack>

      <Divider my={4} />

      <VStack align="start">
        <Heading size="md">Active Discussion</Heading>
        {activeDiscussion ? (
          <Card key={activeDiscussion.id} variant={"light"} w="full" mb={4}>
            <Text fontWeight="bold">{activeDiscussion.title}</Text>
            <Text fontSize="sm" color="gray.500">
              {activeDiscussion.author} -{" "}
              {activeDiscussion.timestamp.toLocaleString()}
            </Text>
            <Divider my={4} />
            <Text>{activeDiscussion.content}</Text>
          </Card>
        ) : (
          <Text color="gray.500">No active discussion available.</Text>
        )}
      </VStack>
    </Box>
  );
};
