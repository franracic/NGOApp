"use client";
import { IGroup } from "@/typings/course";
import { Card, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const GroupDetails = ({ group }: { group: IGroup }) => {
  return (
    <Card p={4} w="full" as={NextLink} href={`/networking/group/${group.id}`}>
      <Text fontSize="xl" fontWeight="bold">
        {group.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {group.members} Members
      </Text>
      <Text mt={4}>{group.description}</Text>
    </Card>
  );
};
